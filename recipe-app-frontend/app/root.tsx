import {
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react'
import styles from './styles/app.css'
import Layout from './components/layout'
import { db } from './utils/db.server'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configure-store'
import BasketModal from './components/layout/basket-modal'
import { deleteRecipe } from './actions/basket/delete-recipe'
import { getUserId } from './utils/session.server'
import { getDbRecipe } from './lib/basket/add-recipe.server'
import Toolbar from './components/layout/toolbar'
import UserProvider from './components/user/user-provider'
import type { User } from '@prisma/client'

type LoaderData = {
  email: User['email']
  userId: User['id']
  basket: {
    recipes: {
      title: string
      id: string
    }[]
  } | null
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
  const basket = await db.basket.findFirst({
    where: { userId },
    select: { recipes: { select: { id: true, title: true } } },
  })

  return json({ basket, userId, email: email?.email })
}

export const action: ActionFunction = async props => {
  return await deleteRecipe(props)
}

export default function App() {
  const data = useLoaderData() as LoaderData
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body id="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <UserProvider user={{ id: data.userId, email: data.email }}>
              <Layout toolbar={<Toolbar />}>
                <Outlet />
              </Layout>
            </UserProvider>
          </PersistGate>
          {searchParams.get('basket-panel') ? (
            <BasketModal
              open={searchParams.get('basket-panel') ? true : false}
              onClose={() => {
                navigate(`${location.pathname}`)
              }}
              basketData={data.basket?.recipes}
            />
          ) : null}
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const navigate = useNavigate()

  if (error) {
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
// TODO:make user register
