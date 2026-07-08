import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

function Capabilities() {

    const { CAPABILITIES, CAPABILITIES_HEADER } = useContent()
    const refGrid = useScrollReveal({ threshold: 0.05 })

    return(
        <section id="capabilities" className="bg-green py-24 px-16 text-cream">

            <h2 className="mb-12 text-6xl font-serif leading-tight text-right pr-16">{CAPABILITIES_HEADER.title}</h2>
            
            <p className="mb-12 font-mono text-xs tracking-widest uppercase opacity-60 text-right pr-16">
                {CAPABILITIES_HEADER.subtitle}
            </p>
            <div ref={refGrid} className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-green-soft">

                {CAPABILITIES.map((cap)=>(
                    <div
                        key={cap.number}
                        className="group p-8 border-r border-green-soft flex flex-col gap-4 last:border-r-0 hover:bg-green-mid transition-colors duration-300"
                    >


                        {cap.image && <img src={cap.image} alt={cap.title}/>}

                        {cap.tag && <span
                            className="font-mono text-xs tracking-widest uppercase border border-green-soft px-3 py-1 w-fit"
                        >{cap.tag}</span>}

                        <p className="font-serif text-2xl leading-tight">{cap.title}</p>

                        <p className="text-sm leading-relaxed opacity-70">{cap.lede}</p>

                        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out mt-auto">
                            <ul className="overflow-hidden border-t border-dashed border-green-soft pt-0 group-hover:pt-4 flex flex-col gap-2 transition-[padding] duration-300 ease-out">
                                {cap.items.map((item)=>(
                                    <li key={item} className="font-mono text-xs opacity-70">- {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

            </div>

        </section>
    )
}
export default Capabilities