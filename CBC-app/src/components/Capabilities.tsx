import { useContent } from "../i18n/LanguageContext"

function Capabilities() {

    const { CAPABILITIES, CAPABILITIES_HEADER } = useContent()

    return(
        <section id="capabilities" className="bg-green py-16 md:py-24 px-6 sm:px-10 lg:px-16 text-cream">

            <h2 data-reveal="chars" className="mb-4 md:mb-12 text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight text-left md:text-right md:pr-16">{CAPABILITIES_HEADER.title}</h2>

            <p data-reveal="fade" className="mb-8 md:mb-12 font-mono text-xs tracking-widest uppercase opacity-60 text-left md:text-right md:pr-16">
                {CAPABILITIES_HEADER.subtitle}
            </p>
            <div data-reveal="fade" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-green-soft">

                {CAPABILITIES.map((cap)=>(
                    <div
                        key={cap.number}
                        className="group p-6 sm:p-8 border-r border-green-soft flex flex-col gap-4 last:border-r-0 hover:bg-green-mid transition-colors duration-300 max-md:border-r-0 max-md:border-b max-md:last:border-b-0"
                    >


                        {cap.image && <img src={cap.image} alt={cap.title}/>}

                        {cap.tag && <span
                            className="font-mono text-xs tracking-widest uppercase border border-green-soft px-3 py-1 w-fit"
                        >{cap.tag}</span>}

                        <p className="font-serif text-2xl leading-tight">{cap.title}</p>

                        <p className="text-sm leading-relaxed opacity-70">{cap.lede}</p>

                        <div className="grid grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out mt-auto">
                            <ul className="overflow-hidden border-t border-dashed border-green-soft pt-4 lg:pt-0 lg:group-hover:pt-4 flex flex-col gap-2 transition-[padding] duration-300 ease-out">
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