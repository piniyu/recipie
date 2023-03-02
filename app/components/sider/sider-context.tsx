import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

export interface SiderItemType {
  icon?: JSX.Element
  value: string | ReactNode
  route?: string
  children?: Omit<SiderItemType, 'children'>[]
  isBtn?: boolean
}
export enum SiderActionKind {
  ADD_CHILD = 'ADD_CHILD',
  UPDATE_CHILD = 'UPDATE_CHILD',
  SET_NEW_SIDER = 'SET_NEW_SIDER',
}

type Context = {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
  hidden: boolean
  close: boolean
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}

export const SiderContext = createContext<Context>({
  hidden: false,
  setHidden: () => {},
  close: false,
  setClose: () => {},
})
const { Provider } = SiderContext

export default function SiderProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [hidden, setHidden] = useState(false)
  const [close, setClose] = useState(document.body.clientWidth <= 768)

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (window.innerWidth <= 768) {
        setClose(true)
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <Provider value={{ hidden, setHidden, close, setClose }}>
      {children}
    </Provider>
  )
}
