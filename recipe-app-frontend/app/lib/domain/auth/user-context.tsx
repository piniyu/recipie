import { User } from '@prisma/client'
import React from 'react'
import { useContext } from 'react'

export const userContext = React.createContext<User['id'] | null>(null)

export function useUser() {
  return useContext(userContext)
}
