import { Link, NavLink, useFetcher, useLoaderData } from '@remix-run/react'
import React, { useContext } from 'react'
import Basket from '~/icons/basket'
import Favorite from '~/icons/favorite'
import Recipe from '~/icons/recipe'
import { db } from '~/utils/db.server'
import Logo from '../../icons/logo'
import { localStorageKey, setLocalValue } from '../localstorage-form/methods'
import { SiderActionKind, SiderItemType } from './sider-context'
import { SiderContext } from './sider-context'

const defaultSiderValue: SiderItemType[] = [
  //     {
  //     icon: <Overview />, value: 'Overview'
  // },
  // { value: 'Upload recipe', route: 'upload', isBtn: true },
  { icon: <Recipe />, value: 'Recipe', route: 'recipe/testrecipe0' },
  { icon: <Favorite />, value: 'Favorite', route: 'favorite' },
  { icon: <Basket />, value: 'Basket', route: 'basket' },
]

function SiderItem({
  icon,
  value,
  isChild = false,
  hasChild = false,
  route,
  idx,
}: SiderItemType & { isChild?: boolean; hasChild?: boolean; idx: number }) {
  // const { dispatch } = useContext(SiderContext)
  if (route) {
    // console.log(route)
    return (
      <NavLink
        to={route}
        onClick={() => {}}
        className={({ isActive }) =>
          `
          flex items-center gap-4 
          relative
          sider-item sider-item-svg 
         
          [font-family:var(--font-ui)]
          transition-colors
          
        
            
            hover:bg-primary
          
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
          
          

          ${isActive ? '  bg-primary-400 ' : ' text-black '}
          `
        }
      >
        {/* before:content-[""] 
          before:absolute 
          before:block 
          before:h-full before:w-1 
          before:-ml-9 
          hover:before:bg-primary-600 */}

        {/* ${
          isActive
            ? isChild
              ? 'hover:bg-primary-700/10 bg-primary-600/10 text-primary-600 before:bg-primary-600'
              : 'text-primary-600 before:bg-primary-600 bg-primary-600/10 hover:bg-primary-700/10'
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

export const loader = async () => {
  const basket = await db.basket.findUnique({
    where: { userId: 'testuser0' },
    include: {
      recipes: { include: { _count: { select: { ingredientsNum: true } } } },
    },
  })
  console.log(basket)
  return basket?.recipes
}

export default function Sider(): JSX.Element | null {
  const { hidden } = useContext(SiderContext)
  // const data = useLoaderData()
  // const basket = async () =>
  //   await db.basket.findUnique({
  //     where: { userId: 'testuser0' },
  //     include: {
  //       recipes: { include: { _count: { select: { ingredientsNum: true } } } },
  //     },
  //   })
  // console.log(db)
  // basket().then(data => {
  //   console.log(data)
  // })

  // console.log(state)
  if (hidden) {
    return null
  }
  return (
    <nav className="w-[255px] h-screen flex flex-col bg-white pt-4 sticky top-0 space-y-4 shadow-xl z-10 overflow-auto">
      <NavLink to="/">
        <div className="sider-item flex p-0 h-7">
          <Logo />
        </div>
      </NavLink>

      <div className="sider-item px-0">
        <div className="flex flex-col items-center gap-3 my-8">
          <span
            className="material-symbols-rounded p-1 text-4xl leading-none bg-black text-white rounded-full "
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
          <span>User Name</span>
          <Link
            to="/upload"
            className="btn-sm w-full bg-gradient-to-l from-primary to-primary/50 font-medium"
          >
            Upload recipe
          </Link>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {defaultSiderValue.map(
          ({ icon, value, children, route, isBtn }, idx) => {
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
          },
        )}
      </div>
    </nav>
  )
}
