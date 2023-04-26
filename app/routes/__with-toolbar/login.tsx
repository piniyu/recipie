import { ActionFunction, json, MetaFunction } from '@remix-run/node'
import { useSearchParams, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ContentCard from '~/components/ui/card/content-card'
import { metaTitlePostfix } from '~/root'
import { db } from '~/service/db.server'
import PriorityHighIcon from '~/components/icons/PriorityHighFill0Wght400Grad25Opsz48'
import { createUserSession, login, register } from '~/service/session.server'
import { badRequest } from 'remix-utils'

type FormProps = {
  email: string
  password: string
  redirectTo: string
  formType: 'register' | 'login'
}

type ActionData = {
  formError?: string
  fields?: Omit<FormProps, 'redirectTo'>
}

export const meta: MetaFunction = () => ({
  title: 'Login' + metaTitlePostfix,
})

function validateUrl(url: any, host: string) {
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
      if (!user) {
        return badRequest({
          fields,
          formError: `Email of Password combination is incorrect`,
        })
      }
      return createUserSession(user.id, redirectTo)
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
    formState: { isValid },
  } = useForm<FormProps>({
    defaultValues: {
      email: 'test@test.com',
      password: '1234',
      redirectTo: '',
      formType: 'login',
    },
  })
  const [watchEmail, watchPsw] = watch(['email', 'password'])

  const onSubmit = (v: FormProps, e?: any) => {
    submit(e.target)
  }

  return (
    <div className="layout-px layout-py mx-auto flex h-full max-w-6xl items-center justify-center">
      <ContentCard className="h-fit max-w-md">
        <div className="flex flex-col gap-8">
          <h1 className="">
            {formType === 'login' ? 'Login' : 'Create account'}
          </h1>
          <div className="flex space-x-2 rounded-lg bg-primary/10 p-4">
            <PriorityHighIcon className="svg-md flex-shrink-0 fill-primary" />
            {formType === 'register' ? (
              <p>
                Please do not input any sensitive personal informations. This
                website would not protect your informations.
              </p>
            ) : (
              <p>
                <i className="text-sm">Default account:</i>
                <br />
                <i className="text-sm">Email:</i>
                <b className="pl-2">test@test.com</b>
                <br />
                <i className="text-sm">Password:</i>
                <b className="pl-2">1234</b>
              </p>
            )}
          </div>
          <form
            method="post"
            className="flex flex-col gap-y-8"
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
            before:absolute 
            before:top-2 
            before:left-2 
            before:block
            before:origin-top-left 
            before:bg-white
            before:px-1
            before:text-gray-400
            before:content-['Email'] 
            dark:before:bg-dark-gray
            ${
              watchEmail.length > 0
                ? `before:-top-2 before:scale-75 before:text-gray-500 dark:before:text-gray-300`
                : ''
            }
            before:cursor-text
            before:transition-all
            focus-within:before:-top-2
            focus-within:before:scale-75
            focus-within:before:text-inherit
            `}
            >
              <input
                {...register('email', {
                  required: true,
                })}
                type="email"
                className="input w-full"
                autoComplete="email"
                data-cy="email"
              />
            </label>
            <label
              className={`
            relative 
            before:absolute 
            before:top-2 
            before:left-2 
            before:block
            before:origin-top-left 
            before:bg-white
            before:px-1
            before:text-gray-400
            before:content-['Password']
            
            dark:before:bg-dark-gray 
            
            ${
              watchPsw.length > 0
                ? `before:-top-2 before:scale-75 before:text-gray-500 dark:before:text-gray-300`
                : ''
            }
            before:cursor-text
            before:transition-all
            focus-within:before:-top-2
            focus-within:before:scale-75
            focus-within:before:text-inherit
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
                data-cy="password"
              />
              {/* <span
                className={`text-xs ${
                  errors.password
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-300'
                } `}
              >
                Your passwords must be 8-32 characters in length, first
                cheracter must be letter, and must contain number
              </span> */}
            </label>
            <div>
              <button
                type="submit"
                className="btn-primary btn-md w-full"
                disabled={!isValid}
                data-cy="submit"
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
      </ContentCard>
    </div>
  )
}
