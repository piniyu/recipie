import { Link, NavLink } from '@remix-run/react'
import React, { useContext } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Recipe from '~/icons/recipe'
import Logo from '../../icons/logo'
import { localStorageKey, setLocalValue } from '../localstorage-form/methods'
import { SiderActionKind, SiderItemType } from './sider-context'
import { SiderContext } from './sider-context'

const defaultSider = {
  items: [
    //     {
    //     icon: <Overview />, value: 'Overview'
    // },
    { value: 'Upload recipe', route: 'upload', isBtn: true },
    { icon: <Recipe />, value: 'Recipe', route: 'recipe' },
    { icon: <Favorite />, value: 'Favorite', route: 'favorite' },
    { icon: <Basket />, value: 'Basket', route: 'basket' },
  ],
}

function SiderItem({
  icon,
  value,
  isChild = false,
  hasChild = false,
  route,
  idx,
}: SiderItemType & { isChild?: boolean; hasChild?: boolean; idx: number }) {
  const { dispatch } = useContext(SiderContext)
  if (route) {
    // console.log(route)
    return (
      <NavLink
        to={route}
        onClick={() => {
          if (value === 'Add a step') {
            dispatch({
              type: SiderActionKind.ADD_CHILD,
              index: 2,
              payload: { value: `${idx + 1}. `, route: `upload/${idx + 1}` },
            })
            setLocalValue(
              localStorageKey.MOCK_STEP_FORM,
              {
                title: '',
                methods: [{ timeStemp: '', content: '' }],
              },
              idx,
            )
          }
        }}
        className={({ isActive }) =>
          `
          flex items-center gap-4 
          relative
          sider-item sider-item-svg 
         
          [font-family:var(--font-ui)]
          transition-colors
          hover:text-orange-600 
          ${
            isChild
              ? `
            
            hover:bg-orange-600/10 
            `
              : 'hover:bg-orange-600/10 '
          }
          ${
            hasChild
              ? `
            after:content-['']
            after:block
            after:absolute
            after:w-full
            after:h-[1px]
            after:-ml-9
            after:bottom-0
            after:bg-white
            `
              : ''
          }
          
          

          ${isActive ? 'text-orange-600  bg-orange-600/10 ' : ' text-gray-600 '}
          `
        }
      >
        {/* before:content-[""] 
          before:absolute 
          before:block 
          before:h-full before:w-1 
          before:-ml-9 
          hover:before:bg-orange-600 */}

        {/* ${
          isActive
            ? isChild
              ? 'hover:bg-orange-700/10 bg-orange-600/10 text-orange-600 before:bg-orange-600'
              : 'text-orange-600 before:bg-orange-600 bg-orange-600/10 hover:bg-orange-700/10'
            : ' text-gray-500 '
        } */}
        {icon}
        {value}
      </NavLink>
    )
  }
  return (
    <span
      className={`
          flex items-center gap-4 
          relative
          ml-5 !mt-8 sider-item-svg 
          text-sm uppercase
          [font-family:var(--font-ui)]
          
          text-gray-400
          select-none
  `}
    >
      {value}
    </span>
  )
}

export default function Sider(): JSX.Element | null {
  const { state, hidden } = useContext(SiderContext)
  // console.log(state)
  if (hidden) {
    return null
  }
  return (
    <nav className="w-[255px] h-screen bg-white layout-py sticky top-0 space-y-4 shadow-xl z-10 overflow-auto">
      <NavLink to="/">
        <div className="sider-item pt-0 pl-0">
          <Logo />
        </div>
      </NavLink>

      <div className="space-y-4">
        {state.map(({ icon, value, children, route, isBtn }, idx) => {
          if (isBtn) {
            return (
              <div className="sider-item px-0 pb-8" key={idx}>
                <Link
                  to={route ? route : `/${value.toLowerCase()}`}
                  className="btn-md btn-primary"
                >
                  {value}
                </Link>
              </div>
            )
          }
          return (
            <React.Fragment key={`${value}_${idx}`}>
              {value === 'Recipe' && (
                <div className="ml-5 text-sm text-gray-400 [font-family:var(--font-ui)]">
                  PAGES
                </div>
              )}
              <SiderItem
                {...{
                  value,
                  icon,
                  hasChild: typeof children !== 'undefined',
                  route,
                  idx,
                }}
              />
              {children && (
                <div className="space-y-4">
                  {children.map((child, idx) => (
                    <SiderItem
                      key={`${child.value}_${idx}`}
                      icon={child.icon}
                      value={child.value}
                      route={child.route}
                      idx={idx}
                      isChild
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}
