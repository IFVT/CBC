import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

function Experience() {
    const { EXPERIENCE, CLIENTS } = useContent()
    const refLeft = useScrollReveal()
    const refRight = useScrollReveal({ threshold: 0.1 })
    const refGrid = useScrollReveal({ threshold: 0.05 })

    return(
        <section
            id="experience"
            className="bg-cream text-green-deep py-16 md:py-24 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-20">

                <div ref={refLeft} className="reveal">
                    <p className="font-mono text-xs tracking-widest uppercase opacity-60 flex items-center gap-3">
                        <span className="w-8 h-px bg-current inline-block"></span>
                        {EXPERIENCE.eyebrow}
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mt-4">
                        {EXPERIENCE.title} <em className="italic">{EXPERIENCE.titleItalic}</em>.
                    </h2>
                </div>

                <div ref={refRight} className="reveal flex flex-col justify-end gap-6">
                    <p className="text-sm leading-relaxed opacity-70 max-w-sm">
                        {EXPERIENCE.lede}
                    </p>
                    <a href="#contact" className="font-mono text-xs tracking-widest uppercase underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity self-start flex items-center gap-2">
                        {EXPERIENCE.buttonText} →
                    </a>
                </div>

            </div>

            <div ref={refGrid} className="reveal max-w-7xl mx-auto border-t border-b border-green-deep/20 overflow-hidden group">
                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                    {[...CLIENTS, ...CLIENTS].map((client, index)=>(
                        <div
                            key={`${client.name}-${index}`}
                            className="w-56 shrink-0 p-6 border-r border-green-deep/20 flex items-center justify-center hover:bg-green-deep/5 transition-colors duration-300"
                        >
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className={`w-auto object-contain ${client.style === "soficu" ? "max-h-24" : "max-h-16"}`}
                                />
                            ) : (
                                <>
                                    {client.style === "abus" && (
                                        <span className="font-sans font-bold text-3xl tracking-widest text-[#0E2A4A]">{client.name}</span>
                                    )}
                                    {client.style === "sesderma" && (
                                        <span className="font-serif italic text-3xl lowercase">{client.name}<sup className="text-sm not-italic font-sans font-semibold">×</sup></span>
                                    )}
                                    {client.style === "soficu" && (
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-sans font-medium text-2xl tracking-[0.3em]">{client.brand}</span>
                                            <span className="font-sans text-xs tracking-[0.3em] uppercase opacity-80">{client.subtitle}</span>
                                        </div>
                                    )}
                                    {client.style === "valenza" && (
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-serif text-2xl tracking-widest">{client.brand}</span>
                                            <span className="font-sans text-xs tracking-[0.3em] uppercase opacity-80">{client.subtitle}</span>
                                        </div>
                                    )}
                                    {client.style === "v2s" && (
                                        <span className="font-sans font-bold text-3xl tracking-widest text-green-deep">{client.brand}</span>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}
export default Experience