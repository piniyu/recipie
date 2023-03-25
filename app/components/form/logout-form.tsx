import { Form } from '@remix-run/react'
import React, { ReactNode } from 'react'

export default function LogoutForm({
  btnClassName,
  formClassName,
  icon,
}: {
  btnClassName?: string
  formClassName?: string
  icon?: ReactNode
}) {
  return (
    <form
      action="/logout"
      method="post"
      className={formClassName ? formClassName : ''}
      onSubmit={() => {
        console.log('onSubmit')
      }}
    >
      <button
        type="submit"
        className={`flex h-full w-full ${btnClassName ? btnClassName : ''}`}
      >
        {icon}
        Logout
      </button>
    </form>
  )
}
