import { MetaFunction } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { useForm } from 'react-hook-form'
import { metaTitlePostfix } from '~/root'

type FormProps = {
  email: string
  password: string
  redirectTo: string
}

export const meta: MetaFunction = () => ({
  title: 'Login' + metaTitlePostfix,
})

export default function Login() {
  const [searchParams] = useSearchParams()
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
    },
  })
  const [watchEmail, watchPsw] = watch(['email', 'password'])

  const onSubmit = (v: FormProps) => {
    console.log(v)
  }

  return (
    <div className="mx-auto layout-px layout-pb pt-32 max-w-6xl flex justify-center">
      <div className="flex flex-col w-96 bg-white p-8 rounded-xl shadow-2xl shadow-gray-300/50 space-y-6">
        <h1>Login</h1>
        <form
          method="post"
          className="flex flex-col space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            {/* <span className="block absolute top-2 left-2 bg-white text-gray-400">
              Email
            </span> */}
            <input
              {...register('email', {
                required: true,
              })}
              type="email"
              className="input w-full"
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
                pattern: /[A-Za-z]{1,}[1-9]+/,
                maxLength: 32,
                minLength: 8,
              })}
              type="password"
              className="input w-full"
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
      </div>
    </div>
  )
}
