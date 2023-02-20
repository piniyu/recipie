import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { isTheme, Theme } from './theme-provider'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'remix-theme-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    // maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

async function getThemeSession(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => {
      const themValue = session.get('theme')
      return isTheme(themValue) ? themValue : null
    },
    setTheme: (theme: Theme) => {
      session.set('theme', theme)
    },
    commit: () => storage.commitSession(session),
  }
}

export { getThemeSession }
