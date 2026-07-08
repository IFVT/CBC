import { useState } from "react"
import { useContent } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

function Contact() {

    const { CONTACT_HEADER, CONTACT_META, CONTACT_CHIPS, CONTACT_FORM } = useContent()
    const [selectedChips, setSelectedChips] = useState<string[]>([])
    const refLeft = useScrollReveal()
    const refRight = useScrollReveal({ threshold: 0.1 })

    const toggleChip = (value: string) => {
        setSelectedChips(prev => 
            prev.includes(value) 
                ? prev.filter(c => c !== value)
                : [...prev, value]
        )
    }

    return(
        <section 
            id="contact"
            className="bg-green-deep text-cream py-24 px-16"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24">

                {/* Columna izquierda */}
                <div ref={refLeft} className="reveal flex flex-col gap-8 max-w-lg">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_HEADER.eyebrow}
                        </p>
                        <h2 className="font-serif text-5xl leading-tight">
                            {CONTACT_HEADER.title} <em className="italic">{CONTACT_HEADER.titleItalic}</em>{CONTACT_HEADER.titleTail}
                        </h2>
                        <p className="text-sm leading-relaxed opacity-60">
                            {CONTACT_HEADER.lede}
                        </p>
                    </div>

                    {/* Metadata de contacto */}
                    <ul className="flex flex-col gap-3 border-t border-green-soft pt-6 font-mono text-sm">
                        <li className="flex gap-4">
                            <span className="opacity-50 tracking-widest">E —</span>
                            <span>{CONTACT_META.email}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="opacity-50 tracking-widest">T —</span>
                            <span>{CONTACT_META.phone}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="opacity-50 tracking-widest">HQ —</span>
                            <span>{CONTACT_META.hq}</span>
                        </li>
                    </ul>
                </div>

                {/* Columna derecha — Formulario */}
                <div ref={refRight} className="reveal grid grid-cols-2 gap-6 content-start">

                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelName}
                        </label>
                        <input 
                            type="text"
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors"
                        />
                    </div>

                    {/* Empresa */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelCompany}
                        </label>
                        <input 
                            type="text"
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelEmail}
                        </label>
                        <input 
                            type="email"
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors"
                        />
                    </div>

                    {/* Chips */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelCapabilities}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CONTACT_CHIPS.map((chip) => (
                                <button
                                    key={chip.value}
                                    onClick={() => toggleChip(chip.value)}
                                    className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition-all duration-200 ${
                                        selectedChips.includes(chip.value)
                                            ? 'bg-cream text-green-deep border-cream'
                                            : 'border-green-soft hover:border-cream'
                                    }`}
                                >
                                    {selectedChips.includes(chip.value) && <span className="mr-1">✓</span>}
                                    {chip.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mensaje */}
                    <div className="col-span-2 flex flex-col gap-2">
                        <label className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelMessage}
                        </label>
                        <textarea 
                            rows={4}
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-2 flex items-center justify-between border-t border-green-soft pt-6">
                        <p className="font-mono text-xs tracking-widest uppercase opacity-40">
                            {CONTACT_FORM.note}
                        </p>
                        <button className="bg-green text-cream font-mono text-xs tracking-widest uppercase px-8 py-4 flex items-center gap-3 hover:bg-cream hover:text-green-deep transition-colors duration-300">
                            {CONTACT_FORM.buttonText}
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="square"/>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact