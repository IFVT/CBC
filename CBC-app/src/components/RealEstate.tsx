import { useContent } from "../i18n/LanguageContext"
import HeroShader from "./HeroShader"

function RealEstate() {
    const { REALESTATE_TOPICS, REALESTATE_HEADER } = useContent()

    return(
        <section
            id="real-estate"
            className="relative overflow-hidden text-white px-6 sm:px-10 lg:px-16 py-16 md:py-24"
        >
            {/* Fondo shader (variante del aurora del hero) */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-green-deep" />
            <HeroShader variant="realestate" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-green-deep via-green-deep/55 to-transparent" />

            <div className="relative max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-6 max-w-xl">
                <p data-reveal="fade" className="font-mono text-xs tracking-widest uppercase opacity-60">
                    {REALESTATE_HEADER.eyebrow}
                </p>
                <h2 data-reveal="chars" className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    {REALESTATE_HEADER.title} <em className="italic">{REALESTATE_HEADER.titleItalics}</em>
                </h2>
                <p data-reveal="fade" className="text-sm leading-relaxed opacity-70 max-w-sm">
                    {REALESTATE_HEADER.lede}
                </p>

                {/* Topics */}
                <div data-reveal="fade" className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-white/20 py-6 max-w-lg">
                    {REALESTATE_TOPICS.map((topic) => (
                        <div key={topic.title} className="flex flex-col gap-2">
                            <p className="font-mono text-xs tracking-widest uppercase text-[#d8a01ef3]">
                                {topic.title}
                            </p>
                            <p className="text-sm leading-relaxed opacity-70">
                                {topic.lede}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Botón */}
                <a
                    data-reveal="fade"
                    href="#contact"
                    className="font-mono text-xs tracking-widest uppercase underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2 w-fit"
                >
                    {REALESTATE_HEADER.buttonText} →
                </a>
            </div>
            </div>
        </section>
    )
}

export default RealEstate
