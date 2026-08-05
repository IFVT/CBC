import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"
import realStateImg from "../assets/realstate-building.jpeg"

function RealEstate() {
    const { REALESTATE_TOPICS, REALESTATE_HEADER } = useContent()
    const refContent = useScrollReveal({ threshold: 0.1 })

    return(
        <section
            id="real-estate"
            className="relative text-white px-6 sm:px-10 lg:px-16 py-16 md:py-24 bg-green-deep bg-cover md:bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${realStateImg})`, backgroundPosition: "right center" }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-green-deep via-green-deep/85 to-green-deep/40 md:via-green-deep/75 md:to-green-deep/10" />

            <div className="relative max-w-7xl mx-auto w-full">
            <div ref={refContent} className="reveal flex flex-col gap-6 max-w-xl">
                <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                    {REALESTATE_HEADER.eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    {REALESTATE_HEADER.title} <em className="italic">{REALESTATE_HEADER.titleItalics}</em>
                </h2>
                <p className="text-sm leading-relaxed opacity-70 max-w-sm">
                    {REALESTATE_HEADER.lede}
                </p>

                {/* Topics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-white/20 py-6 max-w-lg">
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