import { Link } from '@remix-run/react'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import SearchIcon from '~/components/icons/SearchFill1Wght400Grad25Opsz48'

export default function SearchBar({
  placeholder = 'Search',
  border = false,
  list,
  fetch,
}: {
  placeholder?: string
  border?: boolean
  list: { value: string; link: string }[] | undefined
  fetch: (inputValue: string) => void
}): JSX.Element {
  // const inputRef = useRef<HTMLInputElement>(null)
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.blur()
  //     console.log('render1')
  //   }
  // }, [inputRef.current])
  // console.log(list)
  /** TODO: use react-select ? */
  return (
    <div className=" relative w-full max-w-md text-black dark:text-gray-50">
      <div
        className={`
            peer
						flex w-full items-center
						gap-2
						rounded-lg 
						bg-white outline-[3px]
						
						outline-offset-1 outline-focus-outline 
						transition-all
            ease-in 
            focus-within:outline dark:bg-dark-gray
            ${
              border
                ? 'rounded border border-gray-200 focus-within:border-transparent hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                : 'shadow-sm shadow-gray-300 focus-within:shadow-lg hover:shadow-lg dark:shadow-black'
            }
            
            `}
      >
        <SearchIcon className="svg-md svg-gray ml-4" />
        <input
          type="text"
          placeholder={placeholder}
          className={`
              min-w-0
							flex-1
							bg-transparent py-3
							pr-4
              focus:outline-none
          `}
          onChange={e => {
            fetch(e.target.value)
          }}
          // ref={inputRef}
        />
      </div>

      <div
        className={`
            absolute
            z-10
            mt-2
            hidden
            w-full
            rounded-lg 
            border 
            border-gray-100 
            bg-white py-2 
            shadow-lg 
            hover:block 
            focus:block peer-focus-within:block 
            dark:border-gray-600 
            dark:bg-dark-gray
            `}
      >
        {!list || list?.length === 0 ? (
          <div className="px-4 py-2">No results</div>
        ) : (
          list.map((v, idx) => {
            // if (v === null || (list.length === 1 && v.length === 0))
            //   return <div key={idx}>No results</div>
            return (
              <Link
                key={v.value + idx}
                to={v.link}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {v.value}
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
