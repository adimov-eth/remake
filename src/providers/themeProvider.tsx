import { createContext, useContext, FC, ReactNode, useEffect } from 'react'
import { useThemeParams, bindThemeParamsCSSVars } from '@telegram-apps/sdk-react'

interface ThemeContextType {
  isDark: boolean
  themeParams: ReturnType<typeof useThemeParams>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const themeParams = useThemeParams()

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams)
  }, [themeParams])

  const value = {
    isDark: themeParams.isDark,
    themeParams,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}