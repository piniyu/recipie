import { Link, NavLink } from '@remix-run/react'
import React, { useContext } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Recipe from '~/icons/recipe'
import Logo from '../../icons/logo'
import type { SiderItemType } from './sider-context'
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
}: SiderItemType & { isChild?: boolean; hasChild?: boolean }) {
  if (route) {
    return (
      <NavLink
        to={route ? route : ``}
        className={({ isActive }) =>
          `
          flex items-center gap-4 
          relative
          sider-item sider-item-svg 
          text-sm
          [font-family:var(--font-ui)]
          font-bold
          hover:text-orange-600 
          ${
            isChild
              ? `
            bg-gray-200
            hover:bg-orange-700/10 
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
          
          before:content-[""] 
          before:absolute 
          before:block 
          before:h-full before:w-1 
          before:-ml-9 
          hover:before:bg-orange-600

          ${
            isActive
              ? isChild
                ? 'hover:bg-orange-700/10 bg-orange-600/10 text-orange-600 before:bg-orange-600'
                : 'text-orange-600 before:bg-orange-600 bg-orange-600/10'
              : ' text-gray-500 '
          }
          `
        }
      >
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
          sider-item sider-item-svg 
          text-sm
          [font-family:var(--font-ui)]
          font-bold
          text-gray-500
          select-none

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
  `}
    >
      {value}
    </span>
  )
}

export default function Sider(): JSX.Element {
  const { value, setValue } = useContext(SiderContext)
  return (
    <nav className="w-[255px] h-screen bg-gray-50 layout-pt sticky top-0">
      <NavLink to="/">
        <div className="sider-item pt-0">
          <Logo />
        </div>
      </NavLink>
      {/* {} */}
      {value.items.map(({ icon, value, children, route, isBtn }, idx) => {
        if (isBtn) {
          return (
            <div className="sider-item" key={idx}>
              <Link
                to={route ? route : `/${value.toLowerCase()}`}
                className="btn-md btn-primary w-full"
              >
                {value}
              </Link>
            </div>
          )
        }
        return (
          <React.Fragment key={`${value}_${idx}`}>
            <SiderItem
              {...{
                value,
                icon,
                hasChild: typeof children !== 'undefined',
                route,
              }}
            />
            {children && (
              <div className="shadow-inner">
                {children.map((child, idx) => (
                  <SiderItem
                    key={`${child.value}_${idx}`}
                    icon={child.icon}
                    value={child.value}
                    route={child.route}
                    isChild
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
