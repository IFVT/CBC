import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"
import heroBuildingWebp from "../assets/hero-building.webp"
import heroBuilding from "../assets/hero-building.jpeg"

function Hero() {
    const { HERO } = useContent()
    const refCopy = useScrollReveal()
    const refMeta = useScrollReveal({ threshold: 0.1 })

    return(
        <section
            id="top"
            className="relative min-h-screen pt-28 sm:pt-32 px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 flex flex-col overflow-hidden"
        >
            <picture>
                <source srcSet={heroBuildingWebp} type="image/webp" />
                <img
                    src={heroBuilding}
                    alt=""
                    aria-hidden="true"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                />
            </picture>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-deep via-green-deep/80 to-green-deep/20" />

            <div className="relative max-w-7xl mx-auto flex-1 flex items-center w-full">

                <div ref={refCopy} className="reveal flex flex-col gap-5 sm:gap-6 justify-center max-w-2xl">
                    <p className="font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-60 text-cream">{HERO.eyebrow}</p>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-cream">
                        {HERO.title} <em className="text-[#d8a01ef3]">{HERO.titleYellow}</em>
                    </h1>
                    <p className="text-sm sm:text-base leading-relaxed opacity-70 text-cream max-w-lg">{HERO.lede}</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
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