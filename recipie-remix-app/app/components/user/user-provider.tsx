import { User } from '@prisma/client'
import React from 'react'
import { ReactNode } from 'react'
import {
  userContext,
  UserContextType,
} from '../../lib/domain/auth/user-context'

const UserProvider = ({
  user,
  children,
}: {
  user: UserContextType

  children: ReactNode
}) => {
  const { Provider } = userContext
  return <Provider value={user}>{children}</Provider>
}

export default UserProvider
