import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

function Values() {

    const { VALUES_HEADER, VALUES } = useContent()
    const refHeader = useScrollReveal()
    const refGrid = useScrollReveal({ threshold: 0.05 })

    return(
        <section
            id="values"
            className="bg-bone text-green-deep py-24 px-16"
        >
            <div
                className="reveal max-w-7xl mx-auto mb-20"
                ref={refHeader}
            >
                <p
                    className="font-mono text-xs tracking-widest uppercase opacity-60 mb-4"
                >{VALUES_HEADER.eyebrow}</p>
                <h2
                    className="font-serif text-5xl leading-tight"
                >{VALUES_HEADER.title}<em className="italic">{VALUES_HEADER.titleItalic}</em></h2>
            
            </div>

            <div
                className="reveal max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-t border-b border-green-deep/20"
                ref={refGrid}
            >
                {VALUES.map((value)=>(
                    <div
                        key={value.title}
                        className="p-8 border-r border-green-deep/20 last:border-r-0 flex flex-col gap-4 hover:bg-green-deep/5 transition-colors duration-300"
                    >
                        <h3
                            className="font-serif text-2xl leading-tight"
                        >{value.title}</h3>
                        <p
                            className="text-sm leading-relaxed opacity-70"
                        >{value.lede}</p>
                    </div>

                ))}

            </div>


        </section>

    )


}
export default Values