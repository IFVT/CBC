import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

function Footer() {
    const { FOOTER_COLUMNS, FOOTER_TAGLINE } = useContent()
    const refTop = useScrollReveal()
    const refGrid = useScrollReveal({ threshold: 0.05 })
    const refMark = useScrollReveal({ threshold: 0.1 })

    return(
        <footer className="bg-green text-cream">

            {/* Top */}
            <div ref={refTop} className="reveal max-w-7xl mx-auto px-16 py-16 flex items-center justify-between border-b border-green-soft">
                <a href="#top">
                    <img 
                        src="/logos/core-light.png"
                        alt="CORE Build Consulting"
                        className="h-14 w-auto"
                    />
                </a>
                <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                    {FOOTER_TAGLINE}
                </p>
            </div>

            {/* Grid de links */}
            <div ref={refGrid} className="reveal max-w-7xl mx-auto px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                {FOOTER_COLUMNS.map((col) => (
                    <div key={col.title} className="flex flex-col gap-4">
                        <h4 className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {col.title}
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <a 
                                        href={link.href}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Línea separadora */}
            <div className="max-w-7xl mx-auto px-16">
                <div className="h-px bg-green-soft" />
            </div>

            {/* CORE mark grande */}
            <div ref={refMark} className="reveal max-w-7xl mx-auto px-16 py-16 flex items-center justify-center">
                <img 
                    src="/logos/core-light.png"
                    alt="CORE Build Consulting"
                    className="w-full max-w-4xl opacity-20"
                />
            </div>

        </footer>
    )
}

export default Footer