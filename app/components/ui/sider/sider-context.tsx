import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useSize } from '~/hooks/use-resize-observer'
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
  const size = useSize(document.body)
  const [close, setClose] = useState(
    document ? document.body.clientWidth <= 768 : true,
  )

  useEffect(() => {
    setClose(!!size?.width && size.width <= 768)
  }, [size?.width])

  return (
    <Provider value={{ hidden, setHidden, close, setClose }}>
      {children}
    </Provider>
  )
}
