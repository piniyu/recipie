import { Link, NavLink } from '@remix-run/react'
import React, { useContext } from 'react'
import Logo from '../../icons/logo'
import { SiderContext, SiderItemType } from './sider-context'

function SiderItem({
  icon,
  value,
  isChild = false,
  hasChild = false,
  route,
}: SiderItemType & { isChild?: boolean; hasChild?: boolean }) {
  return (
    <NavLink
      to={`/${route ? route : value.toLowerCase()}`}
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
                ? 'hover:bg-orange-700/10 bg-orange-600/10'
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

export default function Sider(): JSX.Element {
  const { value, setValue } = useContext(SiderContext)
  return (
    <nav className="w-[255px] h-screen bg-gray-50 layout-pt sticky top-0">
      <NavLink to="/">
        <div className="sider-item pt-0">
          <Logo />
        </div>
      </NavLink>
      <div className="sider-item">
        <Link to="/upload" className="btn-md btn-primary w-full">
          Upload Recipe
        </Link>
      </div>
      {value.items.map(({ icon, value, children, route }, idx) => (
        <React.Fragment key={`${value}_${idx}`}>
          <SiderItem
            {...{ value, icon, hasChild: typeof children !== 'undefined' }}
          />
          {children && (
            <div className="shadow-inner">
              {children.map((child, idx) => (
                <SiderItem
                  key={`${child.value}_${idx}`}
                  icon={child.icon}
                  value={child.value}
                  isChild
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
