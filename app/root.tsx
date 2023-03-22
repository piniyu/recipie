import {
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import styles from './styles/app.css'
import Layout from './components/ui/layout'
import { db } from './service/db.server'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configure-store'
import { deleteRecipe } from './routes/action/delete-recipe'

import UserProvider from './context/user/user-provider'
import type { User } from '@prisma/client'
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from './context/theme-provider'
import { getThemeSession } from './service/theme-session.server'
import { getUserId } from './service/session.server'

type LoaderData = {
  email: User['email']
  userId: User['id']
  basket: {
    recipes: {
      title: string
      id: string
    }[]
  } | null
  theme: Theme | null
}

export const metaTitlePostfix = ' - Recipie'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Recipie',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.png' },
    { as: 'style', rel: 'stylesheet preload', href: styles },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)

  if (!userId) return json({ userId: null, basket: null, email: null })
  const email = await db.user.findFirst({
    where: { id: userId },
    select: { email: true },
  })

  const themeSession = await getThemeSession(request)
  return json({
    // basket,
    userId,
    email: email?.email,
    theme: themeSession.getTheme(),
  })
}

export const action: ActionFunction = async props => {
  return await deleteRecipe(props)
}

function App() {
  const data = useLoaderData() as LoaderData
  const [theme] = useTheme()

  return (
    <html lang="en" id="app" className={theme ?? ''}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={!!data.theme} />
      </head>

      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <UserProvider user={{ id: data.userId, email: data.email }}>
              <Layout>
                <Outlet />
              </Layout>
            </UserProvider>
          </PersistGate>
          <div id="modal-container"></div>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function AppWithProvider() {
  const data = useLoaderData() as LoaderData

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const navigate = useNavigate()

  if (error) {
    console.error(error)
    return (
      <div>
        Oops! Something went wrong!
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          Go back
        </button>
        <Link to="/">Home page</Link>
      </div>
    )
  }
  return null
}
