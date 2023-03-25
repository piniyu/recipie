import { FetcherWithComponents, useLocation } from '@remix-run/react'
import { useState } from 'react'

import DropdownMenu from './drop-down-menu'

export const SortingDropdown = ({
  fetcher,
}: {
  fetcher: FetcherWithComponents<any>
}) => {
  const location = useLocation()
  const [listOrder, setListOrder] = useState<'New' | 'Popular'>('New')
  return (
    <DropdownMenu
      shouldCloseAfterClick
      summary={listOrder}
      details={
        <ul>
          <li
            className={`drop-down-item ${
              listOrder === 'New'
                ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                : ''
            }`}
            onClick={() => {
              setListOrder('New')
              fetcher.load(`${location.pathname}?index&orderby=new`)
            }}
          >
            New
          </li>
          <li
            className={`drop-down-item ${
              listOrder === 'Popular'
                ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                : ''
            }`}
            onClick={() => {
              setListOrder('Popular')
              fetcher.load(`${location.pathname}?index&orderby=popular`)
            }}
          >
            Popular
          </li>
        </ul>
      }
      hasDownArrow
    />
  )
}
