import { Link, NavLink } from '@remix-run/react'
import React, { useContext } from 'react'
import { useAppDispatch } from '~/store/configure-store'
import { setSiderOpen } from '~/store/sider-slice'
import { SiderItemType } from './sider'

export function SiderItem({ icon, value, route }: SiderItemType) {
  const dispatch = useAppDispatch()
  if (route) {
    return (
      <NavLink
        to={route}
        onClick={() => {
          if (window.innerWidth <= 768) {
            dispatch(setSiderOpen(false))
          }
        }}
        className={({ isActive }) =>
          `
          sider-item sider-item-svg relative 
          flex
          items-center gap-4 
         
          transition-colors
          hover:bg-primary
          dark:hover:bg-primary-dark
          
          ${isActive ? '  bg-primary dark:bg-primary-dark' : 'text-inherit'}
          `
        }
      >
        {icon}
        {value}
      </NavLink>
    )
  } else if (typeof value !== 'string' && React.isValidElement(value)) {
    return value
  }
  return (
    <span
      className={`
          ml-5 mt-8 mb-2 flex 
          select-none items-center
          gap-4 text-sm
          uppercase
          tracking-wider
          text-gray-400
  `}
    >
      {value}
    </span>
  )
}
