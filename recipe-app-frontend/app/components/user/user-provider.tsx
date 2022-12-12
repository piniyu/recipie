import { User } from '@prisma/client'
import React from 'react'
import { ReactNode } from 'react'
import { userContext } from '../../lib/domain/auth/user-context'

type UserProviderProps = User['id'] | null

const UserProvider = ({
  user,
  children,
}: {
  user: UserProviderProps
  children: ReactNode
}) => {
  const { Provider } = userContext
  return <Provider value={user}>{children}</Provider>
}

export default UserProvider
