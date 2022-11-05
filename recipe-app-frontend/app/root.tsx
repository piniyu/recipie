import type {
  ErrorBoundaryComponent,
  LinksFunction,
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
// import { StyledEngineProvider } from '@mui/material'

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
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      {/* <StyledEngineProvider injectFirst> */}
      <body id="app">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      {/* </StyledEngineProvider> */}
    </html>
  )
}
