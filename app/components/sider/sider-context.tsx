import { useLocation } from '@remix-run/react'
import { ReactNode, useEffect, useState } from 'react'
import { createContext, useReducer } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Overview from '~/icons/overview'
import Recipe from '~/components/icons/recipe'

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
interface SiderAction {
  type: SiderActionKind
  payload: Omit<SiderItemType, 'children'> | SiderItemType[]
  index?: number
  childIndex?: number
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
      console.log(e)
      // for (const entry of e) {
      if (window.innerWidth <= 768) {
        setClose(true)
      }
      // }
    }
    // const resizeObserver = new ResizeObserver(onResize)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      // resizeObserver.disconnect()
    }
  }, [])

  return (
    <Provider value={{ hidden, setHidden, close, setClose }}>
      {children}
    </Provider>
  )
}
