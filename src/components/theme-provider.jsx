"use client"

import * as React from "react"

const ThemeProviderContext = React.createContext(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}) {
  const [theme, setTheme] = React.useState(() => localStorage?.getItem(storageKey) || defaultTheme)

  React.useEffect(() => {
    const root = window.document.documentElement

    if (disableTransitionOnChange) {
      root.classList.add("transition-none")
      window.setTimeout(() => {
        root.classList.remove("transition-none")
      }, 0)
    }

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      root.setAttribute(attribute, systemTheme)
      return
    }

    root.setAttribute(attribute, theme)
  }, [theme, attribute, enableSystem, disableTransitionOnChange])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme) => {
        localStorage?.setItem(storageKey, theme)
        setTheme(theme)
      },
    }),
    [theme, storageKey],
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

