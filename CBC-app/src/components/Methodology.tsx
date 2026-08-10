import { useState, useEffect } from "react";
import { useContent } from "../i18n/LanguageContext";

function Methodology()  {

    const { METHODOLOGY_HEADER, METHODOLOGY_STEP, METHODOLOGY_OUTCOME_LABEL } = useContent()

    const [activeStep, setActiveStep] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [scrollDriven, setScrollDriven] = useState(false)

    const handleStepChange = (index: number) => {
        setIsTransitioning(true)
        setProgress(0)
        setTimeout(() => {
            setActiveStep(index)
            setIsTransitioning(false)
        }, 200)
    }

    const handleStepClick = (index: number) => {
        setIsPaused(true)
        handleStepChange(index)
    }

    useEffect(() => {
        if (!isPaused) return
        const resume = setTimeout(() => setIsPaused(false), 15000)
        return () => clearTimeout(resume)
    }, [isPaused, activeStep])

    useEffect(() => {
        if (isPaused || scrollDriven) return
        const interval = setInterval(() => {
            handleStepChange((activeStep + 1) % METHODOLOGY_STEP.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [activeStep, isPaused, scrollDriven])

    useEffect(() => {
        if (isPaused || scrollDriven) return
        const tick = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0
                return prev + (100 / (6000 / 60))
            })
        }, 60)
        return () => clearInterval(tick)
    }, [activeStep, isPaused, scrollDriven])

    // Pin + scroll: en desktop la sección se fija y las fases avanzan con
    // el scroll (reemplaza el autoplay). Móvil y reduced-motion conservan
    // el autoplay.
    useEffect(() => {
        if (typeof window === "undefined") return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (!window.matchMedia("(min-width: 1024px)").matches) return

        let cancelled = false
        let cleanup = () => {}

        ;(async () => {
            let gsapMod, stMod
            try {
                ;[gsapMod, stMod] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
            } catch {
                return
            }
            if (cancelled) return
            const gsap = gsapMod.gsap ?? gsapMod.default
            const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default
            gsap.registerPlugin(ScrollTrigger)

            const section = document.getElementById("methodology")
            if (!section) return
            const steps = METHODOLOGY_STEP.length
            setScrollDriven(true)
            let current = -1

            const st = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=" + (steps - 1) * 100 + "%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const step = Math.min(Math.floor(self.progress * steps), steps - 1)
                    if (step !== current) {
                        current = step
                        setActiveStep(step)
                    }
                },
            })
            ScrollTrigger.refresh()

            cleanup = () => {
                st.kill()
                setScrollDriven(false)
            }
        })()

        return () => {
            cancelled = true
            cleanup()
        }
    }, [METHODOLOGY_STEP.length])

    return (
        <section
            id="methodology"
            className="bg-cream text-green-deep py-16 md:py-24 px-6 sm:px-10 lg:px-16"
        >
            {/* Header */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-12 md:mb-20">
                <div className="flex flex-col gap-4 md:order-1 order-2">
                    <p data-reveal="fade" className="font-mono text-xs tracking-widest uppercase opacity-60">{METHODOLOGY_HEADER.eyebrow}</p>
                    <p data-reveal="fade" className="text-sm leading-relaxed opacity-70 max-w-sm">{METHODOLOGY_HEADER.lede}</p>
                </div>
                <div className="flex items-end md:order-2 order-1">
                    <h2 data-reveal="chars" className="font-serif text-4xl sm:text-6xl lg:text-8xl leading-tight">
                        {METHODOLOGY_HEADER.title} <em className="italic">{METHODOLOGY_HEADER.titleItalic}</em> {METHODOLOGY_HEADER.titleEnd}
                    </h2>
                </div>
            </div>

            {/* Rail horizontal */}
            <div data-reveal="fade" className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-green-deep/20">
                {METHODOLOGY_STEP.map((step) => (
                    <button
                        type="button"
                        key={step.number}
                        onClick={() => handleStepClick(step.number - 1)}
                        aria-current={activeStep === step.number - 1 ? "step" : undefined}
                        className={`relative overflow-hidden text-left w-full py-4 md:py-5 px-4 sm:px-6 cursor-pointer border-r border-green-deep/20 last:border-r-0 transition duration-300 select-none ${
                            activeStep === step.number - 1
                                ? 'bg-green-deep text-cream'
                                : 'hover:opacity-70'
                        }`}
                    >
                        <p className="font-mono text-xs tracking-widest opacity-60 mb-2">
                            {String(step.number).padStart(2, '0')}
                        </p>
                        <p className="font-serif text-base">{step.title}</p>
                        {activeStep === step.number - 1 && !scrollDriven && (
                            <div
                                className="absolute bottom-0 left-0 h-0.5 bg-cream transition-all duration-75"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Panel — sin reveal para no interferir con la transición */}
            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 pt-8 md:pt-16 transition-all duration-200 ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
                <div className="flex items-center justify-center">
                    <span className="font-serif text-[7rem] sm:text-[12rem] md:text-[20rem] leading-none text-green-deep select-none">
                        {String(METHODOLOGY_STEP[activeStep].number).padStart(2, '0')}
                    </span>
                </div>
                <div className="flex flex-col gap-6 md:py-12">
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                        {METHODOLOGY_STEP[activeStep].title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-70">
                        {METHODOLOGY_STEP[activeStep].lede}
                    </p>
                    <ul className="flex flex-col gap-3 border-t border-green-deep/20 pt-4">
                        {METHODOLOGY_STEP[activeStep].items.map((item, index) => (
                            <li key={item} className="font-mono text-xs opacity-70 flex gap-4">
                                <span className="opacity-50">{String(index + 1).padStart(2, '0')}</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-mono text-xs tracking-widest border-t border-dashed border-green-deep/20 pt-4">
                        <span className="opacity-50">{METHODOLOGY_OUTCOME_LABEL} → </span>
                        <span className="uppercase">{METHODOLOGY_STEP[activeStep].outcome}</span>
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Methodology