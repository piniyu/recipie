import { ActionFunction, json, redirect } from '@remix-run/server-runtime'
import { isTheme } from '~/context/theme-provider'
import { getThemeSession } from '~/service/theme-session.server'

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get('theme')

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    })
  }

  themeSession.setTheme(theme)
  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } },
  )
}

export const loader = async () => redirect('/', { status: 404 })
