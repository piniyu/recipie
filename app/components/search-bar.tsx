import _ from 'lodash'
import { useCallback, useState } from 'react'

export default function SearchBar({
  placeholder = 'Search',
  border = false,
  list,
  fetch,
}: {
  placeholder?: string
  border?: boolean
  list: { value: string; id: string }[] | undefined
  fetch: (inputValue: string) => void
}): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const debounceFetch = useCallback(
    () =>
      _.debounce(
        () => {
          console.log(inputValue)
          fetch(inputValue)
        },
        300,
        { trailing: true },
      ),
    [],
  )
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
        <span className="material-symbols-rounded pl-4 text-xl leading-none text-gray-400">
          search
        </span>
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
            // setInputValue(e.target.value)
            // debounceFetch()
            fetch(e.target.value)
          }}
        />
      </div>

      <div
        className={`
            absolute
            z-10
            mt-2
            hidden
            w-full rounded-lg 
            border 
            border-gray-100 bg-white px-4 py-3
            shadow-lg 
            hover:block 
            focus:block peer-focus-within:block 
            dark:border-gray-600 
            dark:bg-dark-gray
            `}
      >
        {list === undefined || list?.length === 0 ? (
          <div>No results</div>
        ) : (
          list?.map((v, idx) => {
            // if (v === null || (list.length === 1 && v.length === 0))
            //   return <div key={idx}>No results</div>
            return <div key={v.value + idx}>{v.value}</div>
          })
        )}
      </div>
    </div>
  )
}
