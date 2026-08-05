import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T>(null)
    const root = options?.root ?? null
    const rootMargin = options?.rootMargin ?? "0px"
    const threshold = options?.threshold ?? 0.15

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Si el navegador no soporta IntersectionObserver, o el usuario pidio
        // menos movimiento, mostramos el contenido de inmediato.
        const prefersReducedMotion =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches

        if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
            el.classList.add("is-visible")
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-visible")
                    observer.unobserve(el)
                }
            },
            {
                root,
                rootMargin,
                threshold,
            }
        )

        observer.observe(el)

        return () => observer.disconnect()
    }, [root, rootMargin, threshold])

    return ref
}
