"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { useColorScheme } from "react-native"

type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark", // Default to dark as per requirements
  toggleTheme: () => {},
  isDark: true,
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme()
  const [theme, setTheme] = useState<ThemeType>("dark") // Default to dark theme

  useEffect(() => {
    // We could sync with device theme, but requirement is for dark theme
    // setTheme(deviceTheme === 'dark' ? 'dark' : 'light');
  }, [deviceTheme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>{children}</ThemeContext.Provider>
  )
}

