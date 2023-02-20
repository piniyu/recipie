/** @see https://www.mattstobbs.com/remix-dark-mode/ */
import { useFetcher, useSubmit } from '@remix-run/react'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const prefersDarkMQ = '(prefers-color-scheme: dark)'
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT

/** hydrate before react runs ,or will get error for mismatching of <html> class between server side and client side
 * (server side: '' , client side: light || dark ) */

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
    console.log(window)
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "something went wrong!",
    );
  } else {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "no meta color-scheme found",
    );
  }
})();
`

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme()

  return (
    <>
      <meta
        name="color-scheme"
        content={theme === 'light' ? 'light dark' : 'dark light'}
      />
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
      )}
    </>
  )
}

const themes: Array<Theme> = Object.values(Theme)

function isTheme(value: any): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme)
}

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: ReactNode
  specifiedTheme: Theme | null
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme
      } else {
        return null
      }
    }
    if (typeof window !== 'object') {
      return null
    }
    return getPreferredTheme()
  })

  const fetcher = useFetcher()
  const persistThemeRef = useRef(fetcher)
  useEffect(() => {
    persistThemeRef.current = fetcher
  }, [fetcher])
  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ)
    const onChange = () => {
      setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
    }
    mediaQuery.addEventListener('change', onChange)

    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const mountRun = useRef(false)

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true
      return
    }
    if (!theme) {
      return
    }

    persistThemeRef.current.submit(
      { theme },
      { action: 'action/set-theme', method: 'post' },
    )
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { Theme, ThemeProvider, useTheme, NonFlashOfWrongThemeEls, isTheme }
