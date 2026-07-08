import { useState, useEffect } from "react";
import { useContent, useLang } from "../i18n/LanguageContext";

function Nav() {

    const { NAV_LINKS, NAV_CTA } = useContent()
    const { lang, setLang } = useLang()

    const [isScrolled, setIsScrolled] = useState(false)
    const [isLight, setIsLight] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const navHeight = document.getElementById('nav')?.offsetHeight ?? 40
            setIsScrolled(window.scrollY > navHeight)

            const lightSections = ['experience', 'methodology', 'values']
            const scrollY = window.scrollY + navHeight

            let onLight = false
            for (const id of lightSections) {
                const el = document.getElementById(id)
                if (el) {
                    const top = el.offsetTop
                    const bottom = top + el.offsetHeight
                    if (scrollY >= top && scrollY <= bottom) {
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

    return(
        <header 
            id="nav"
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
                isScrolled 
                    ? isLight
                        ? 'bg-cream/92 border-b border-green-deep/14 text-green-deep px-16 py-3'
                        : 'bg-green-deep/85 backdrop-blur-sm border-b border-white/14 px-16 py-3'
                    : isLight
                        ? 'bg-transparent text-green-deep px-16 py-6'
                        : 'bg-transparent text-cream px-16 py-6'
            }`}
        >
            
            <a href="#top">
                <img 
                    src={isLight ? "/logos/core-dark.png" : "/logos/core-light.png"}
                    alt="CORE Build Consulting"
                    className="h-16 w-auto transition-all duration-300"
                />
            </a>

            <nav className="flex gap-9">
                {NAV_LINKS.map((link)=>(
                    <a 
                        href={link.href} 
                        key={link.href}
                        className="relative font-mono text-xs tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity py-1 group"
                    >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                    </a>
                ))}
            </nav>

            <div className="flex items-center gap-6">

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
                    href="#contact"
                    className="font-mono text-xs tracking-widest uppercase border border-current px-5 py-3 hover:bg-current hover:text-cream transition-colors flex items-center gap-2"
                >
                    {NAV_CTA}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                </a>

            </div>

        </header>
    )
}

export default Nav