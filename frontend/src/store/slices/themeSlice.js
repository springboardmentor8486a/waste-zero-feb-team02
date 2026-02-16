const THEME_STORAGE_KEY = 'theme'

const isValidTheme = (value) => value === 'light' || value === 'dark'

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const getStoredTheme = () => {
  if (typeof window === 'undefined') return null
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  return isValidTheme(storedTheme) ? storedTheme : null
}

const getInitialTheme = () => getStoredTheme() ?? getSystemTheme()

export const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const isDark = theme === 'dark'

  root.classList.toggle('dark', isDark)
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export const createThemeSlice = (set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    const nextTheme = isValidTheme(theme) ? theme : 'light'

    set({ theme: nextTheme })
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }
    applyThemeToDocument(nextTheme)
  },
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(nextTheme)
  },
})
