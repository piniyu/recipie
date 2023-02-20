import { User } from '@prisma/client'
import { useLocation } from '@remix-run/react'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContextType, useUser } from '../../lib/domain/auth/user-context'
import Modal from '../layout/modal'

export default function AuthCheck({
  children,
  loginConfirmModal = true,
}: {
  children: (user: UserContextType) => ReactElement
  loginConfirmModal?: boolean
}): JSX.Element | null {
  const user = useUser()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  if (!user || !user.id) {
    return (
      <div
        onClick={e => {
          if (loginConfirmModal) {
            setOpen(true)
          }
        }}
      >
        {children(user)}
        {loginConfirmModal ? (
          <Modal
            onClose={() => setOpen(false)}
            open={open}
            className="layout-px layout-py w-96 rounded-xl"
          >
            <h3 className="mb-10 text-center">Login to continue</h3>
            <div className="flex justify-center gap-6">
              {location.pathname === '/login' ? null : (
                <Link
                  to={`/login?redirectTo=${window.location.href}`}
                  className="btn-sm btn-secondary"
                  onClick={e => e.stopPropagation()}
                >
                  Login
                </Link>
              )}
              <button
                className="btn-sm btn-gray"
                onClick={e => {
                  e.stopPropagation()
                  setOpen(false)
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    )
  }

  return children(user)
  // if (user) {
  //   if (typeof children === 'function') {
  //   }
  //   return <>{children}</>
  // }
  // return null
}
