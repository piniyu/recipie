import React from 'react'

export default function LogoutForm({
  btnClassName,
  formProps,
}: {
  btnClassName?: string
  formProps?: React.FormHTMLAttributes<HTMLFormElement>
}) {
  return (
    <form action="/logout" method="post" {...formProps}>
      <button
        type="submit"
        className={`w-full h-full ${btnClassName ? btnClassName : ''}`}
      >
        Logout
      </button>
    </form>
  )
}
