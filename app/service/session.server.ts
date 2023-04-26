import { db } from './db.server'
import * as argon2 from 'argon2'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

type LoginForm = {
  email: string
  password: string
}

export async function login({ email, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user) return null

  const isCorrectPassword = await argon2.verify(user.password, password)

  if (!isCorrectPassword) return null
  return { id: user.id, email }
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RP_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect('/', {
    status: 302,
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') return null

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    })
    return user
  } catch {
    throw logout(request)
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function register({ email, password }: LoginForm) {
  const passwordHash = await argon2.hash(password)
  const user = await db.user.create({
    data: { email, password: passwordHash },
  })
  return { id: user.id, username: user.name }
}
