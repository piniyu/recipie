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
import Layout from './components/layout'
import { db } from './utils/db.server'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configure-store'
import { deleteRecipe } from './actions/basket/delete-recipe'
import { getUserId } from './utils/session.server'
import Toolbar from './components/layout/toolbar'
import UserProvider from './components/user/user-provider'
import type { User } from '@prisma/client'
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from './utils/theme-provider'
import { getThemeSession } from './utils/theme-session.server'

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
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
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
    console.log(error)
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
