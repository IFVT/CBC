import { useContent } from "../i18n/LanguageContext"

const SOCIALS = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/core-build-consulting/",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/corebuildconsulting",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/people/Core-Build-Consulting/61589571893822/",
        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
]

function Footer() {
    const { FOOTER_COLUMNS, FOOTER_TAGLINE } = useContent()

    return(
        <footer className="bg-green text-cream">

            {/* Top */}
            <div data-reveal="fade" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-between border-b border-green-soft">
                <a href="#top">
                    <img
                        src="/logos/core-light.png"
                        alt="CORE Build Consulting"
                        className="h-12 sm:h-14 w-auto"
                    />
                </a>
                <div className="flex flex-col items-center sm:items-end gap-4">
                    <p className="font-mono text-xs tracking-widest uppercase opacity-60 text-center sm:text-right">
                        {FOOTER_TAGLINE}
                    </p>
                    <div className="flex items-center gap-4">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d={social.path} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de links */}
            <div data-reveal="fade" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
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
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4 break-words"
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
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                <div className="h-px bg-green-soft" />
            </div>

            {/* CORE mark grande */}
            <div data-reveal="fade" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16 flex items-center justify-center">
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