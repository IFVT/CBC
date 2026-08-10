import { useContent } from "../i18n/LanguageContext";

function VisionMission() {

    const { MISSION, VISION } = useContent()

    return(
        <section
            id="about"
            className="grid grid-cols-1 md:grid-cols-2 text-cream"
        >
            <div
                data-reveal="fade"
                className="bg-green px-6 sm:px-10 lg:px-16 py-16 md:py-24 flex flex-col gap-6 md:gap-8 border-b md:border-b-0 md:border-r border-green-soft"
            >
                <p
                    className="font-mono text-xs tracking-widest uppercase opacity-60"
                >{VISION.eyebrow}</p>
                <p
                    className="font-serif text-xl sm:text-2xl leading-relaxed max-w-lg"
                >{VISION.lede}</p>
            </div>

            <div
                data-reveal="fade"
                className="bg-green-mid px-6 sm:px-10 lg:px-16 py-16 md:py-24 flex flex-col gap-6 md:gap-8"
            >
                <p
                    className="font-mono text-xs tracking-widest uppercase opacity-60"
                >{MISSION.eyebrow}</p>
                <p
                    className="font-serif text-xl sm:text-2xl leading-relaxed max-w-lg"
                >{MISSION.lede}</p>
            </div>

        </section>
    )


}
export default VisionMission