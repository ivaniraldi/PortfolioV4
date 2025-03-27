"use client"

import { createContext, useContext, useState, useEffect } from "react"
import enTranslations from "../../translations/en.json"
import esTranslations from "../../translations/es.json"
import ptTranslations from "../../translations/pt.json"

const LanguageContext = createContext(undefined)

const translations = {
  en: enTranslations,
  es: esTranslations,
  pt: ptTranslations,
}

export function LanguageProvider({ children, defaultLanguage = "en" }) {
  const [language, setLanguage] = useState(defaultLanguage || "en")
  const [languageName, setLanguageName] = useState("English")

  // Check if browser language is available and set it as default if no IP-based language is set
  useEffect(() => {
    if (typeof window !== "undefined" && defaultLanguage === "en") {
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "pt" || browserLang === "es") {
        setLanguage(browserLang)
      }
    }
  }, [defaultLanguage])

  // Update language name when language changes
  useEffect(() => {
    switch (language) {
      case "en":
        setLanguageName("English")
        break
      case "pt":
        setLanguageName("Português")
        break
      case "es":
        setLanguageName("Español")
        break
      default:
        setLanguageName("English")
    }

    // Update HTML lang attribute for accessibility and SEO
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  const t = (key) => {
    if (!translations[language]) return key
    
    // Handle nested keys (e.g., "projects.title")
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageName }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

