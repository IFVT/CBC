import { useState } from "react"
import { useContent, useLang } from "../i18n/LanguageContext"

type Status = "idle" | "submitting" | "success" | "error"
type FieldKey = "name" | "company" | "email" | "message" | "capabilities"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({})
    const [formError, setFormError] = useState("")

    const clearError = (key: FieldKey) => {
        setFieldErrors(prev => {
            if (!prev[key]) return prev
            const next = { ...prev }
            delete next[key]
            return next
        })
        setFormError("")
    }

    const toggleChip = (value: string) => {
        setSelectedChips(prev =>
            prev.includes(value)
                ? prev.filter(c => c !== value)
                : [...prev, value]
        )
        clearError("capabilities")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === "submitting") return

        // Validación en el cliente
        const errs: Partial<Record<FieldKey, string>> = {}
        if (!name.trim()) errs.name = CONTACT_FORM.required
        if (!company.trim()) errs.company = CONTACT_FORM.required
        if (!email.trim()) errs.email = CONTACT_FORM.required
        else if (!EMAIL_RE.test(email.trim())) errs.email = CONTACT_FORM.invalidEmail
        if (!message.trim()) errs.message = CONTACT_FORM.required
        if (selectedChips.length === 0) errs.capabilities = CONTACT_FORM.required

        if (Object.keys(errs).length > 0) {
            setFieldErrors(errs)
            const labels: Record<FieldKey, string> = {
                name: CONTACT_FORM.labelName,
                company: CONTACT_FORM.labelCompany,
                email: CONTACT_FORM.labelEmail,
                message: CONTACT_FORM.messageShort,
                capabilities: CONTACT_FORM.labelCapabilities,
            }
            const order: FieldKey[] = ["name", "company", "email", "message", "capabilities"]
            const missing = order.filter(k => errs[k] === CONTACT_FORM.required).map(k => labels[k])
            const parts: string[] = []
            if (missing.length) parts.push(`${CONTACT_FORM.validationMissing}${missing.join(", ")}`)
            if (errs.email === CONTACT_FORM.invalidEmail) parts.push(CONTACT_FORM.invalidEmail)
            setFormError(parts.join("  ·  "))
            setStatus("idle")
            return
        }

        setFieldErrors({})
        setFormError("")
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
        : status === "error" ? CONTACT_FORM.error
        : CONTACT_FORM.note

    const statusClass = status === "error" ? "text-[#e88] opacity-90" : "opacity-40"

    const fieldClass = (key: FieldKey) =>
        `bg-transparent border-b py-2 text-sm transition-colors ${
            fieldErrors[key] ? "border-[#e88] focus:border-[#e88]" : "border-green-soft focus:border-cream"
        }`

    return(
        <section
            id="contact"
            className="bg-green-deep text-cream py-16 md:py-24 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Columna izquierda */}
                <div className="flex flex-col gap-8 max-w-lg">
                    <div className="flex flex-col gap-4">
                        <p data-reveal="fade" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_HEADER.eyebrow}
                        </p>
                        <h2 data-reveal="chars" className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                            {CONTACT_HEADER.title} <em className="italic">{CONTACT_HEADER.titleItalic}</em>{CONTACT_HEADER.titleTail}
                        </h2>
                        <p data-reveal="fade" className="text-sm leading-relaxed opacity-60">
                            {CONTACT_HEADER.lede}
                        </p>
                    </div>

                    {/* Metadata de contacto */}
                    <ul data-reveal="fade" className="flex flex-col gap-3 border-t border-green-soft pt-6 font-mono text-sm">
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
                <form data-reveal="fade" onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 content-start">

                    {status === "success" ? (
                    /* Panel de confirmación */
                    <div className="sm:col-span-2 min-h-[420px] flex flex-col items-center justify-center text-center gap-6 py-12">
                        <div className="w-16 h-16 rounded-full border border-cream/40 flex items-center justify-center">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="font-serif text-4xl leading-tight">{CONTACT_FORM.successTitle}</h3>
                            <p className="text-sm leading-relaxed opacity-70 max-w-sm mx-auto">{CONTACT_FORM.success}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="font-mono text-xs tracking-widest uppercase underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
                        >
                            {CONTACT_FORM.sendAnother}
                        </button>
                    </div>
                    ) : (
                    <>

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
                            aria-invalid={!!fieldErrors.name}
                            value={name}
                            onChange={(e) => { setName(e.target.value); clearError("name") }}
                            className={fieldClass("name")}
                        />
                        {fieldErrors.name && <p className="text-[#e88] text-xs">{fieldErrors.name}</p>}
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
                            aria-invalid={!!fieldErrors.company}
                            value={company}
                            onChange={(e) => { setCompany(e.target.value); clearError("company") }}
                            className={fieldClass("company")}
                        />
                        {fieldErrors.company && <p className="text-[#e88] text-xs">{fieldErrors.company}</p>}
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
                            aria-invalid={!!fieldErrors.email}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); clearError("email") }}
                            className={fieldClass("email")}
                        />
                        {fieldErrors.email && <p className="text-[#e88] text-xs">{fieldErrors.email}</p>}
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
                                    className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition duration-200 ${
                                        selectedChips.includes(chip.value)
                                            ? 'bg-cream text-green-deep border-cream'
                                            : fieldErrors.capabilities
                                                ? 'border-[#e88] hover:border-cream'
                                                : 'border-green-soft hover:border-cream'
                                    }`}
                                >
                                    {selectedChips.includes(chip.value) && <span className="mr-1">✓</span>}
                                    {chip.label}
                                </button>
                            ))}
                        </div>
                        {fieldErrors.capabilities && <p className="text-[#e88] text-xs">{fieldErrors.capabilities}</p>}
                    </div>

                    {/* Mensaje */}
                    <div className="sm:col-span-2 flex flex-col gap-2">
                        <label htmlFor="contact-message" className="font-mono text-xs tracking-widest uppercase opacity-60">
                            {CONTACT_FORM.labelMessage}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={4}
                            aria-invalid={!!fieldErrors.message}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value); clearError("message") }}
                            className={`${fieldClass("message")} resize-none`}
                        />
                        {fieldErrors.message && <p className="text-[#e88] text-xs">{fieldErrors.message}</p>}
                    </div>

                    {/* Notificación de validación */}
                    {formError && (
                        <div className="sm:col-span-2 border border-[#e88]/40 bg-[#e88]/10 px-4 py-3">
                            <p role="alert" className="text-[#e88] text-xs leading-relaxed">
                                {formError}
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-green-soft pt-6 gap-4 sm:gap-6">
                        <p
                            aria-live="polite"
                            className={`font-mono text-xs tracking-widest uppercase max-w-xs ${statusClass}`}
                        >
                            {statusMessage}
                        </p>
                        <button
                            type="submit"
                            data-magnetic
                            disabled={status === "submitting"}
                            className="bg-green text-cream font-mono text-xs tracking-widest uppercase px-8 py-4 flex items-center gap-3 hover:bg-cream hover:text-green-deep transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        >
                            {status === "submitting" ? CONTACT_FORM.sending : CONTACT_FORM.buttonText}
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="square"/>
                            </svg>
                        </button>
                    </div>

                    </>
                    )}

                </form>
            </div>
        </section>
    )
}

export default Contact
