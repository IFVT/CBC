import { useEffect, useRef } from "react"

export function useScrollReveal(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null)
    const root = options?.root ?? null
    const rootMargin = options?.rootMargin ?? "0px"
    const threshold = options?.threshold ?? 0.15

    useEffect(() => {
        const el = ref.current
        if (!el) return

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