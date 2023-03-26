import { Link } from '@remix-run/react'
import React, { ReactNode } from 'react'

import Recipe from '~/components/icons/recipe'
import Logo from '~/components/icons/Logo'
import AuthCheck from '../../../feature/auth/auth-check'
import LogoutForm from '../../form/logout-form'
import LoginIcon from '~/components/icons/LoginFill0Wght400Grad25Opsz48'
import LogoutIcon from '~/components/icons/LogoutFill0Wght400Grad25Opsz48'
import LikeIcon from '~/components/icons/FavoriteFill0Wght400Grad25Opsz48'
import BasketIcon from '~/components/icons/ShoppingBasketFill0Wght400Grad25Opsz48'
import GithubIcon from '~/components/icons/Github'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { setSiderOpen } from '~/store/sider-slice'
import { SiderItem } from './sider-item'

export interface SiderItemType {
  icon?: JSX.Element
  value: string | ReactNode
  route?: string
  children?: Omit<SiderItemType, 'children'>[]
  isBtn?: boolean
}

const defaultSiderValue: SiderItemType[] = [
  { value: 'Pages' },
  {
    icon: <Recipe className="svg-md svg-neutral" />,
    value: 'My Recipes',
    route: 'my-recipes',
  },
  {
    icon: <LikeIcon className="svg-md svg-neutral" />,
    value: 'Favorite',
    route: 'favorite',
  },
  {
    icon: <BasketIcon className="svg-md svg-neutral" />,
    value: 'Basket',
    route: 'basket',
  },
  { value: 'Authentication' },
]
export default function Sider(): JSX.Element | null {
  // const { hidden, close, setClose } = useContext(SiderContext)
  const dispatch = useAppDispatch()
  const { open, hidden } = useAppSelector(s => s.sider)

  if (hidden) {
    return null
  }
  return (
    <>
      {open ? (
        <div
          className="fixed z-20 h-screen w-screen bg-black/70 backdrop-brightness-75 lg:hidden"
          onClick={() => {
            dispatch(setSiderOpen(false))
          }}
        ></div>
      ) : null}
      <nav
        className={`
      fixed top-0 
      z-30 
      flex h-screen 
      w-[255px] 
      flex-shrink-0 flex-col 
      gap-4 
      overflow-auto 
      bg-white 
      pt-4 
      text-inherit
      shadow-xl
      transition-transform
      ${!open ? '-translate-x-full' : ''}
      
      dark:bg-dark-gray
      dark:shadow-gray-900
      `}
      >
        <Link
          to="/"
          className="sider-item flex h-7 p-0"
          onClick={() => {
            if (window.innerWidth <= 768) {
              dispatch(setSiderOpen(false))
            }
          }}
        >
          <Logo />
        </Link>
        <Link
          to="/upload/details"
          className="sider-item btn-sm btn-secondary mt-8"
          onClick={() => {
            if (window.innerWidth <= 768) {
              dispatch(setSiderOpen(false))
            }
          }}
        >
          Uplode Recipe
        </Link>

        <div className="flex flex-1 flex-col ">
          {defaultSiderValue.map(
            ({ icon, value, children, route, isBtn }, idx) => {
              if (isBtn) {
                return (
                  <div className="sider-item px-0 pb-8" key={idx}>
                    {route ? (
                      <Link to={route} className="btn-md btn-primary">
                        {value}
                      </Link>
                    ) : (
                      value
                    )}
                  </div>
                )
              }
              return (
                <React.Fragment key={idx}>
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
                        />
                      ))}
                    </div>
                  )}
                </React.Fragment>
              )
            },
          )}
          <AuthCheck loginConfirmModal={false}>
            {user => {
              if (user && user.id !== null) {
                return (
                  <LogoutForm
                    icon={<LogoutIcon className="svg-md svg-neutral" />}
                    formClassName="flex items-center"
                    btnClassName="gap-4 relative
                sider-item sider-item-svg 
                text-left
                text-black dark:text-gray-50
                transition-colors hover:bg-primary dark:hover:bg-primary-dark"
                  />
                )
              }
              return (
                <SiderItem
                  icon={<LoginIcon className="svg-md svg-neutral" />}
                  value={'Login'}
                  route={`/login?redirectTo=${
                    window ? window.location.href : ''
                  }`}
                />
              )
            }}
          </AuthCheck>
        </div>
        <div className=" my-2 border-t border-gray-200 py-4 dark:border-gray-600">
          <a
            className=" sider-item sider-item-svg flex items-center gap-4 hover:cursor-pointer hover:bg-primary hover:dark:bg-primary-dark"
            href="https://github.com/piniyu/recipie-remix-app"
            target="_blank"
          >
            <GithubIcon /> Github page
          </a>
        </div>
      </nav>
    </>
  )
}
