import { Fragment } from "react"
import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"
import HeroShader from "./HeroShader"

function Hero() {
    const { HERO } = useContent()
    const refMeta = useScrollReveal({ threshold: 0.1 })

    const titleWords = HERO.title.split(" ")
    const yellowWords = HERO.titleYellow.split(" ")
    const wordDelay = (i: number) => `${0.1 + i * 0.04}s`
    const total = titleWords.length + yellowWords.length

    return(
        <section
            id="top"
            className="relative min-h-screen pt-28 sm:pt-32 px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 flex flex-col overflow-hidden"
        >
            {/* Fondo: base + aurora CSS (fallback) + shader WebGL encima */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-green-deep" />
            <div className="hero-scroll-parallax absolute inset-0 -z-10">
                <div className="hero-mouse-parallax absolute inset-0">
                    <div className="hero-aurora absolute inset-0">
                        <div className="hero-blob-wrap"><span className="hero-blob hero-blob-1" /></div>
                        <div className="hero-blob-wrap"><span className="hero-blob hero-blob-2" /></div>
                        <div className="hero-blob-wrap"><span className="hero-blob hero-blob-3" /></div>
                    </div>
                </div>
            </div>
            <HeroShader />

            {/* Legibilidad + grade cinematográfico (viñeta + grano) */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-deep via-green-deep/40 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(120% 115% at 50% 42%, transparent 55%, rgba(5,8,5,0.5) 100%)" }} />
            <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 -z-10" />

            <div className="relative max-w-7xl mx-auto flex-1 flex items-center w-full">

                <div className="flex flex-col gap-5 sm:gap-6 justify-center max-w-2xl">
                    <p className="hero-fade font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-60 text-cream">{HERO.eyebrow}</p>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-cream">
                        {titleWords.map((word, i) => (
                            <Fragment key={`t${i}`}>
                                <span className="hero-mask"><span className="hero-word-inner" style={{ animationDelay: wordDelay(i) }}>{word}</span></span>{" "}
                            </Fragment>
                        ))}
                        <em className="text-[#d8a01ef3]">
                            {yellowWords.map((word, i) => (
                                <Fragment key={`y${i}`}>
                                    <span className="hero-mask"><span className="hero-word-inner" style={{ animationDelay: wordDelay(titleWords.length + i) }}>{word}</span></span>{" "}
                                </Fragment>
                            ))}
                        </em>
                    </h1>
                    <p className="hero-fade text-sm sm:text-base leading-relaxed opacity-70 text-cream max-w-lg" style={{ animationDelay: `${0.1 + total * 0.04 + 0.05}s` }}>{HERO.lede}</p>
                    <div className="hero-fade flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2" style={{ animationDelay: `${0.1 + total * 0.04 + 0.17}s` }}>
                        <a href={HERO.cta1.href} className="text-center bg-cream text-green-deep px-6 py-3 font-mono text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                            {HERO.cta1.label}
                        </a>
                        <a href={HERO.cta2.href} className="text-center border border-cream text-cream px-6 py-3 font-mono text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity">
                            {HERO.cta2.label}
                        </a>
                    </div>
                </div>

            </div>

            <div ref={refMeta} className="reveal relative border-t border-green mt-10 sm:mt-16 max-w-7xl mx-auto w-full flex flex-wrap items-center gap-x-4 gap-y-1 pt-6">
                <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-40 text-cream">{HERO.meta1}</span>
                <span className="opacity-20 text-cream hidden sm:inline">·</span>
                <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-40 text-cream">{HERO.meta2}</span>
            </div>

        </section>
    )
}

export default Hero
