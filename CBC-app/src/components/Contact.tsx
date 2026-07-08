import { useState } from "react"
import { useContent, useLang } from "../i18n/LanguageContext"
import { useScrollReveal } from "../hooks/useScrollReveal"

type Status = "idle" | "submitting" | "success" | "error"

function Contact() {

    const { CONTACT_HEADER, CONTACT_META, CONTACT_CHIPS, CONTACT_FORM } = useContent()
    const { lang } = useLang()

    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [website, setWebsite] = useState("") // honeypot
    const [selectedChips, setSelectedChips] = useState<string[]>([])
    const [status, setStatus] = useState<Status>("idle")

    const refLeft = useScrollReveal()
    const refRight = useScrollReveal<HTMLFormElement>({ threshold: 0.1 })

    const toggleChip = (value: string) => {
        setSelectedChips(prev =>
            prev.includes(value)
                ? prev.filter(c => c !== value)
                : [...prev, value]
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === "submitting") return
        setStatus("submitting")

        const capabilities = CONTACT_CHIPS
            .filter(chip => selectedChips.includes(chip.value))
            .map(chip => chip.label)

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, company, email, message, capabilities, lang, website }),
            })

            if (!res.ok) throw new Error("Request failed")

            setStatus("success")
            setName("")
            setCompany("")
            setEmail("")
            setMessage("")
            setSelectedChips([])
        } catch {
            setStatus("error")
        }
    }

    const statusMessage =
        status === "submitting" ? CONTACT_FORM.sending
        : status === "success" ? CONTACT_FORM.success
        : status === "error" ? CONTACT_FORM.error
        : CONTACT_FORM.note

    const statusClass =
        status === "success" ? "text-cream opacity-90"
        : status === "error" ? "text-[#e88] opacity-90"
        : "opacity-40"

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
                <form ref={refRight} onSubmit={handleSubmit} className="reveal grid grid-cols-2 gap-6 content-start">

                    {/* Honeypot anti-spam — oculto para usuarios reales */}
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden"
                    />

                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="contact-name" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelName}
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors"
                        />
                    </div>

                    {/* Empresa */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="contact-company" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelCompany}
                        </label>
                        <input
                            id="contact-company"
                            name="company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelEmail}
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                    type="button"
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
                        <label htmlFor="contact-message" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelMessage}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-transparent border-b border-green-soft py-2 text-sm outline-none focus:border-cream transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-2 flex items-center justify-between border-t border-green-soft pt-6 gap-6">
                        <p
                            role={status === "error" ? "alert" : undefined}
                            aria-live="polite"
                            className={`font-mono text-xs tracking-widest uppercase max-w-xs ${statusClass}`}
                        >
                            {statusMessage}
                        </p>
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="bg-green text-cream font-mono text-xs tracking-widest uppercase px-8 py-4 flex items-center gap-3 hover:bg-cream hover:text-green-deep transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        >
                            {status === "submitting" ? CONTACT_FORM.sending : CONTACT_FORM.buttonText}
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="square"/>
                            </svg>
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Contact
