import { ActionFunction, json, MetaFunction } from '@remix-run/node'
import { useSearchParams, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'
import { createUserSession, login, register } from '~/utils/session.server'

type FormProps = {
  email: string
  password: string
  redirectTo: string
  formType: 'register' | 'login'
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
  }
  fields?: Omit<FormProps, 'redirectTo'>
}

export const meta: MetaFunction = () => ({
  title: 'Login' + metaTitlePostfix,
})

function validateUrl(url: any, host: string) {
  console.log(url)
  // let urls = ['/', 'http://localhost:3000']
  if (url.includes(host)) {
    return url
  }
  return '/'
}

function validateFormType(formType: any): formType is FormProps['formType'] {
  return (
    typeof formType === 'string' && ['login', 'register'].includes(formType)
  )
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url)
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const redirectTo = validateUrl(form.get('redirectTo') || '/', url.host)
  const formType = form.get('formType')

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string' ||
    !validateFormType(formType)
  ) {
    return badRequest({ formError: `Form not submitted correctly` })
  }

  const fields = { formType, email, password }

  switch (formType) {
    case 'login': {
      const user = await login({ email, password })
      console.log({ user })
      if (!user) {
        return badRequest({
          fields,
          formError: `Email of Password combination is incorrect`,
        })
      }
      console.log(redirectTo)
      return createUserSession(user.id, redirectTo)
      // return badRequest({ fields, formError: 'Not implemented' })
    }
    case 'register': {
      const userExists = await db.user.findFirst({
        where: { email },
      })
      if (userExists) {
        return badRequest({ fields, formError: 'User already exists' })
      }
      const user = await register({ email, password })
      if (!user) {
        return badRequest({
          fields,
          formError: 'Somethig went wrong trying to create a new user',
        })
      }
      return createUserSession(user.id, redirectTo)
    }
    default: {
      return badRequest({ fields, formError: `FormType invalid` })
    }
  }
}

export default function Login() {
  const [formType, setFormType] = useState<FormProps['formType']>('login')
  const [searchParams] = useSearchParams()
  const submit = useSubmit()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormProps>({
    defaultValues: {
      email: '',
      password: '',
      redirectTo: '',
      formType: 'login',
    },
  })
  const [watchEmail, watchPsw] = watch(['email', 'password'])

  const onSubmit = (v: FormProps, e?: any) => {
    console.log(v, e)
    submit(e.target)
  }

  return (
    <div className="mx-auto layout-px layout-pb pt-32 max-w-6xl flex justify-center">
      <div className="flex flex-col w-96 bg-white p-8 rounded-xl shadow-2xl shadow-gray-300/50 space-y-6">
        <h1> {formType === 'login' ? 'Login' : 'Create account'}</h1>
        {formType === 'register' ? (
          <div className="flex space-x-2 p-4 rounded-lg bg-primary/10">
            <span className="material-symbols-rounded text-primary">
              priority_high
            </span>
            <p>
              Please do not input any sensitive personal informations, since
              this is a demo website which does not protect your datas and would
              delete the datas in 7 days.
            </p>
          </div>
        ) : null}
        <form
          method="post"
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input {...register('formType')} type="hidden" value={formType} />
          <input
            {...register('redirectTo')}
            type="hidden"
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <label
            className={`
            relative 
            before:block 
            before:content-['Email'] 
            before:absolute 
            before:top-2
            before:left-2 
            before:origin-top-left
            before:px-1
            before:bg-white 
            before:text-gray-400
            ${
              watchEmail.length > 0
                ? `before:-top-2 before:text-gray-500 before:scale-75`
                : ''
            }
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `}
          >
            <input
              {...register('email', {
                required: true,
              })}
              type="email"
              className="input w-full"
              autoComplete="email"
            />
          </label>
          <label
            className={`
            relative 
            before:block 
            before:content-['Password'] 
            before:absolute 
            before:top-2
            before:left-2 
            before:origin-top-left
            before:px-1
            before:bg-white 
            before:text-gray-400
            ${
              watchPsw.length > 0
                ? `before:-top-2 before:text-gray-500 before:scale-75`
                : ''
            }
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `}
          >
            <input
              {...register('password', {
                required: true,
                // pattern: /[A-Za-z]{1,}[1-9]+/,
                // maxLength: 32,
                // minLength: 8,
              })}
              type="password"
              className="input w-full"
              autoComplete="current-password"
            />
            <span
              className={`text-xs ${
                errors.password ? 'text-red-500' : 'text-gray-500'
              } `}
            >
              Should include charactor and number and begin with charactor in
              8-32 long
            </span>
          </label>
          <div>
            <button
              type="submit"
              className="btn-primary btn-md w-full"
              disabled={!isDirty}
            >
              Submit
            </button>
          </div>
        </form>
        {formType === 'login' ? (
          <button className="link" onClick={() => setFormType('register')}>
            Create new account
          </button>
        ) : (
          <button className="link" onClick={() => setFormType('login')}>
            Login
          </button>
        )}
      </div>
    </div>
  )
}
