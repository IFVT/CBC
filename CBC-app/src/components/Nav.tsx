import { useState, useEffect } from "react";
import { useContent, useLang } from "../i18n/LanguageContext";

function Nav() {

    const { NAV_LINKS, NAV_CTA } = useContent()
    const { lang, setLang } = useLang()

    const [isScrolled, setIsScrolled] = useState(false)
    const [isLight, setIsLight] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeId, setActiveId] = useState("top")

    useEffect(() => {
        const handleScroll = () => {
            const navHeight = document.getElementById('nav')?.offsetHeight ?? 40
            setIsScrolled(window.scrollY > navHeight)

            // ¿el nav está sobre una sección de fondo claro? Usamos rect
            // (relativo al viewport) para que sea robusto ante cualquier
            // layout (posiciones fijas, spacers, etc.).
            const lightSections = ['experience', 'methodology', 'values']
            let onLight = false
            for (const id of lightSections) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= navHeight && rect.bottom >= navHeight) {
                        onLight = true
                        break
                    }
                }
            }
            setIsLight(onLight)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Sección activa: resalta el enlace del nav de la sección en el centro.
    useEffect(() => {
        const ids = ["capabilities", "methodology", "real-estate", "about", "top"]
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el)
        if (!sections.length) return
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveId(e.target.id)
                })
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
        )
        sections.forEach((s) => obs.observe(s))
        return () => obs.disconnect()
    }, [])

    const horizontal = isScrolled ? 'px-6 sm:px-10 lg:px-16 py-3' : 'px-6 sm:px-10 lg:px-16 py-4 lg:py-6'

    return(
        <header
            id="nav"
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
                isScrolled
                    ? isLight
                        ? `bg-cream/92 border-b border-green-deep/14 text-green-deep ${horizontal}`
                        : `bg-green-deep/85 backdrop-blur-sm border-b border-white/14 ${horizontal}`
                    : isLight
                        ? `bg-transparent text-green-deep ${horizontal}`
                        : `bg-transparent text-cream ${horizontal}`
            }`}
        >

            <a href="#top" onClick={() => setMenuOpen(false)}>
                <img
                    src={isLight ? "/logos/core-dark.png" : "/logos/core-light.png"}
                    alt="CORE Build Consulting"
                    className="h-11 sm:h-14 lg:h-16 w-auto transition-all duration-300"
                />
            </a>

            {/* Enlaces centrales — solo en desktop */}
            <nav className="hidden lg:flex gap-9">
                {NAV_LINKS.map((link)=>{
                    const active = link.href === `#${activeId}`
                    return (
                    <a
                        href={link.href}
                        key={link.href}
                        aria-current={active ? "true" : undefined}
                        className={`relative font-mono text-xs tracking-widest uppercase transition-opacity py-1 group ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                    >
                        {link.label}
                        <span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </a>
                    )
                })}
            </nav>

            <div className="flex items-center gap-4 md:gap-6">

                {/* Selector de idioma */}
                <div className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase">
                    <button
                        type="button"
                        onClick={() => setLang("en")}
                        aria-pressed={lang === "en"}
                        className={`transition-opacity ${lang === "en" ? "opacity-100 font-semibold" : "opacity-40 hover:opacity-70"}`}
                    >
                        EN
                    </button>
                    <span className="opacity-30">/</span>
                    <button
                        type="button"
                        onClick={() => setLang("es")}
                        aria-pressed={lang === "es"}
                        className={`transition-opacity ${lang === "es" ? "opacity-100 font-semibold" : "opacity-40 hover:opacity-70"}`}
                    >
                        ES
                    </button>
                </div>

                <a
                    data-magnetic
                    href="#contact"
                    className="hidden sm:flex font-mono text-xs tracking-widest uppercase border border-current px-5 py-3 hover:bg-current hover:text-cream transition-colors items-center gap-2"
                >
                    {NAV_CTA}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                </a>

                {/* Botón hamburguesa — solo en móvil/tablet */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                    className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 items-center"
                >
                    <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </div>

            {/* Menú desplegable móvil */}
            {menuOpen && (
                <nav className="lg:hidden absolute top-full left-0 right-0 bg-green-deep/97 backdrop-blur-sm border-t border-white/10 text-cream flex flex-col px-6 py-4">
                    {NAV_LINKS.map((link) => (
                        <a
                            href={link.href}
                            key={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-mono text-xs tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity py-4 border-b border-white/10"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="font-mono text-xs tracking-widest uppercase py-4 flex items-center gap-2"
                    >
                        {NAV_CTA}
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                        </svg>
                    </a>
                </nav>
            )}

        </header>
    )
}

export default Nav
