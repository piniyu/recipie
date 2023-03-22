import React, { ReactNode } from 'react'

export default function LogoutForm({
  btnClassName,
  formProps,
  icon,
}: {
  btnClassName?: string
  formProps?: React.FormHTMLAttributes<HTMLFormElement>
  icon?: ReactNode
}) {
  return (
    <form action="/logout" method="post" {...formProps}>
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
