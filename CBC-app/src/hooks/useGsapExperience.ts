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

    let cancelled = false
    let cleanup = () => {}

    ;(async () => {
      const [lenisMod, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      if (cancelled) return

      const Lenis = lenisMod.default
      const gsap = gsapMod.gsap ?? gsapMod.default
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default
      gsap.registerPlugin(ScrollTrigger)

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
      cleanup()
    }
  }, [])
}
