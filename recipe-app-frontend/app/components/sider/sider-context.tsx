import type { ReactNode } from 'react'
import { createContext, useState } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Overview from '~/icons/overview'
import Recipe from '~/icons/recipe'

export type SiderItemType = {
  icon?: JSX.Element
  value: string
  route?: string
  children?: Omit<SiderItemType, 'children'>[]
  isBtn?: boolean
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
export const defaultSiderValue: SiderItems = {
  items: [
    //     {
    //     icon: <Overview />, value: 'Overview'
    // },
    { value: 'Upload recipe', route: 'upload/details', isBtn: true },
    { icon: <Recipe />, value: 'Recipe', route: 'recipe' },
    { icon: <Favorite />, value: 'Favorite', route: 'favorite' },
    { icon: <Basket />, value: 'Basket', route: 'basket' },
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
