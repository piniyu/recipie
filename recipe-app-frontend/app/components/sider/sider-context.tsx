import { createContext, ReactNode, useState } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Overview from '~/icons/overview'
import Recipe from '~/icons/recipe'

export type SiderItemType = {
  icon?: JSX.Element
  value: string
  route?: string
  children?: Omit<SiderItemType, 'children'>[]
}
type SiderItems = { items: SiderItemType[] }

type Context = {
  value: SiderItems
  setValue: React.Dispatch<React.SetStateAction<SiderItems>>
}

const initialValue: SiderItems = {
  items: [
    { icon: undefined, value: '', children: [{ icon: undefined, value: '' }] },
  ],
}
const defaultSiderValue: SiderItems = {
  items: [
    //     {
    //     icon: <Overview />, value: 'Overview'
    // },
    { icon: <Recipe />, value: 'Recipe' },
    { icon: <Favorite />, value: 'Favorite' },
    { icon: <Basket />, value: 'Basket' },
  ],
}

export const SiderContext = createContext<Context>({
  value: initialValue,
  setValue: () => {},
})
const { Provider } = SiderContext

export default function SiderProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [defaultValue, setDefaultValue] =
    useState<SiderItems>(defaultSiderValue)
  return (
    <Provider value={{ value: defaultValue, setValue: setDefaultValue }}>
      {children}
    </Provider>
  )
}
