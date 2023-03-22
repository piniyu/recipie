import { ReactNode } from 'react'
import { UserContext, UserContextType } from './user-context'

const UserProvider = ({
  user,
  children,
}: {
  user: UserContextType

  children: ReactNode
}) => {
  const { Provider } = UserContext
  return <Provider value={user}>{children}</Provider>
}

export default UserProvider
