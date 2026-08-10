import { useContent } from "../i18n/LanguageContext"

function Team() {
    const { TEAM, TEAM_HEADER } = useContent()

    return(
        <section className="bg-cream text-green-deep py-16 md:py-24 px-6 sm:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto mb-10 md:mb-16">
                <p data-reveal="fade" className="font-mono text-xs tracking-widest uppercase opacity-60 mb-4">{TEAM_HEADER.eyebrow}</p>
                <h2 data-reveal="chars" className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    {TEAM_HEADER.title} <em className="italic">{TEAM_HEADER.titleItalic}</em>
                </h2>
            </div>

            <div data-reveal="stagger" className="max-w-7xl mx-auto border-t border-green-deep/20">
                {TEAM.map((member) => (
                    <div key={member.name} className="grid grid-cols-1 md:grid-cols-3 md:items-baseline gap-1 md:gap-0 py-5 md:py-6 border-b border-green-deep/20 md:hover:px-4 transition-all duration-300">
                        <p className="font-serif text-xl sm:text-2xl">{member.name}</p>
                        <p className="font-mono text-xs tracking-widest uppercase opacity-60 md:text-center">{member.role}</p>
                        <p className="font-mono text-xs tracking-widest uppercase opacity-60 md:text-right">{member.department}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Team