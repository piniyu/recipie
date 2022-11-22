import {
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
  useNavigate,
} from '@remix-run/react'
import styles from './styles/app.css'
import Layout from './components/layout'
import { db } from './utils/db.server'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'store/configureStore'

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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const navigate = useNavigate()

  if (error) {
    console.log('error')
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

// export const loader: LoaderFunction = async () => {
//   const basket = await db.basket.findUnique({
//     where: { userId: 'testuser0' },
//     include: {
//       recipes: { include: { _count: { select: { ingredientsNum: true } } } },
//     },
//   })
//   console.log(json(basket))
// }

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body id="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Outlet />
            </Layout>
          </PersistGate>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
