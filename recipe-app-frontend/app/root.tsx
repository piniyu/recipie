import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'
import Layout from './components/layout'

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
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap',
    },
    {
      as: 'style',
      rel: 'stylesheet preload',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
    { as: 'style', rel: 'stylesheet preload', href: styles },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body id="app">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
