import { useLocation } from '@remix-run/react'
import { ReactNode, useState } from 'react'
import { createContext, useReducer } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Overview from '~/icons/overview'
import Recipe from '~/icons/recipe'

export interface SiderItemType {
  icon?: JSX.Element
  value: string
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

// const isChild = (
//   value: SiderAction['payload'],
// ): value is Omit<SiderItemType, 'children'> => {
//   return !Array.isArray(value)
// }

// const reducer = (
//   state: SiderItemType[],
//   action: SiderAction,
// ): SiderItemType[] => {
//   const newState = [...state]
//   switch (action.type) {
//     case SiderActionKind.ADD_CHILD:
//       if (isChild(action.payload) && typeof action.index !== 'undefined') {
//         let children = newState[action.index].children
//           ? newState[action.index].children
//           : undefined
//         if (isChild(action.payload) && children !== undefined) {
//           children[children.length - 1] = action.payload
//           children.push({
//             value: 'Add a step',
//             route: `upload/${children?.length + 1}`,
//           })
//           return [...newState]
//         }
//       }
//     case SiderActionKind.UPDATE_CHILD:
//       // console.log(isChild(action.payload))
//       if (
//         typeof action.childIndex === 'number' &&
//         typeof action.index === 'number' &&
//         isChild(action.payload)
//       ) {
//         let children = newState[action.index].children
//           ? newState[action.index].children
//           : undefined
//         typeof children !== 'undefined' &&
//           (children[action.childIndex].value = action.payload.value)
//         return [...newState]
//       }
//     case SiderActionKind.SET_NEW_SIDER:
//       if (!isChild(action.payload)) {
//         return action.payload
//       }
//     default:
//       return state
//   }
// }

export default function SiderProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const location = useLocation()
  // const [state, dispatch] = useReducer(reducer, defaultSiderValue)
  const [hidden, setHidden] = useState(false)
  const [close, setClose] = useState(false)
  return (
    <Provider value={{ hidden, setHidden, close, setClose }}>
      {children}
    </Provider>
  )
}
