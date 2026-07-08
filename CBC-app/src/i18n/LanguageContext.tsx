import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { CONTENT, type Lang, type SiteContent } from "../data/content"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "cbc-lang"

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "en" || stored === "es") return stored
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === "en" ? "es" : "en"))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider")
  return ctx
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent(): SiteContent {
  const { lang } = useLang()
  return CONTENT[lang]
}
