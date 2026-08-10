import { useEffect } from "react"

/**
 * Carga GSAP + Lenis DE FORMA DIFERIDA (import dinámico, tras el primer
 * pintado) para no penalizar el LCP, y monta:
 *  - scroll suave (Lenis) sincronizado con ScrollTrigger
 *  - parallax del fondo del Hero al hacer scroll
 *  - parallax sutil del fondo con el mouse (solo puntero fino / desktop)
 *
 * Respeta prefers-reduced-motion: si el usuario pidió menos movimiento,
 * no monta nada (scroll nativo, sin parallax).
 */
export function useGsapExperience() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const root = document.documentElement
    // Failsafe: si GSAP no monta los reveals a tiempo (o falla la carga del
    // chunk), mostramos TODO el texto igual — nunca se queda oculto.
    const failsafe = window.setTimeout(() => root.classList.add("no-reveal"), 2600)

    let cancelled = false
    let cleanup = () => {}

    ;(async () => {
      let lenisMod, gsapMod, stMod, splitMod
      try {
        ;[lenisMod, gsapMod, stMod, splitMod] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/SplitText"),
        ])
      } catch {
        window.clearTimeout(failsafe)
        root.classList.add("no-reveal")
        return
      }
      if (cancelled) return

      const Lenis = lenisMod.default
      const gsap = gsapMod.gsap ?? gsapMod.default
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default
      const SplitText = splitMod.SplitText ?? splitMod.default
      gsap.registerPlugin(ScrollTrigger, SplitText)

      // --- Scroll suave (Lenis) + sincronía con ScrollTrigger ---
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
      lenis.on("scroll", ScrollTrigger.update)
      const raf = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // --- Animaciones ligadas al scroll (aurora reacciona al scroll) ---
      const ctx = gsap.context(() => {
        const st = {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true as const,
        }

        // Deriva general de todo el aurora
        const layer = document.querySelector(".hero-scroll-parallax")
        if (layer) {
          gsap.to(layer, { yPercent: 14, ease: "none", scrollTrigger: st })
        }

        // Cada bloom se mueve independiente al hacer scroll: se separan,
        // el dorado crece y sube -> el fondo "vive" con el scroll.
        const wraps = gsap.utils.toArray<HTMLElement>(".hero-blob-wrap")
        const moves = [
          { yPercent: -32, xPercent: -14, scale: 1.4 },
          { yPercent: 42, xPercent: 12, scale: 1.15 },
          { yPercent: -24, xPercent: 6, scale: 1.8 },
        ]
        wraps.forEach((wrap, i) => {
          gsap.to(wrap, { ...(moves[i] ?? moves[0]), ease: "none", scrollTrigger: st })
        })
      })
      window.clearTimeout(failsafe)

      // --- Reveal de texto al hacer scroll ---
      // Se monta cuando la fuente ya cargó y el layout es estable, para que
      // ScrollTrigger mida bien las posiciones y no se dispare al cargar.
      const setupReveals = () => {
        ctx.add(() => {
          // Cuerpo: fade-up limpio.
          gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 26 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              },
            )
          })
          // Títulos / líneas clave: reveal letra a letra.
          gsap.utils.toArray<HTMLElement>('[data-reveal="chars"]').forEach((el) => {
            const split = new SplitText(el, { type: "words,chars" })
            gsap.set(el, { opacity: 1 })
            // Ocultamos las letras YA (no vía immediateRender del tween, que
            // ScrollTrigger no aplica) para que no se vean antes del scroll.
            gsap.set(split.chars, { display: "inline-block", opacity: 0, yPercent: 60 })
            gsap.to(split.chars, {
              opacity: 1,
              yPercent: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.02,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            })
          })
          ScrollTrigger.refresh()
        })
      }
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
      if (fonts && fonts.ready) fonts.ready.then(setupReveals)
      else setupReveals()

      // --- Parallax con el mouse (solo puntero fino) ---
      let mouseCleanup = () => {}
      if (window.matchMedia("(pointer: fine)").matches) {
        const mouseLayer = document.querySelector<HTMLElement>(".hero-mouse-parallax")
        const hero = document.querySelector<HTMLElement>("#top")
        if (mouseLayer && hero) {
          const xTo = gsap.quickTo(mouseLayer, "x", { duration: 0.7, ease: "power3" })
          const yTo = gsap.quickTo(mouseLayer, "y", { duration: 0.7, ease: "power3" })
          const onMove = (e: PointerEvent) => {
            const r = hero.getBoundingClientRect()
            const nx = (e.clientX - r.left) / r.width - 0.5
            const ny = (e.clientY - r.top) / r.height - 0.5
            xTo(nx * 22)
            yTo(ny * 22)
          }
          const onLeave = () => {
            xTo(0)
            yTo(0)
          }
          hero.addEventListener("pointermove", onMove)
          hero.addEventListener("pointerleave", onLeave)
          mouseCleanup = () => {
            hero.removeEventListener("pointermove", onMove)
            hero.removeEventListener("pointerleave", onLeave)
          }
        }
      }

      cleanup = () => {
        mouseCleanup()
        ctx.revert()
        gsap.ticker.remove(raf)
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      root.classList.remove("no-reveal")
      cleanup()
    }
  }, [])
}
