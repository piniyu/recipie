import { useSearchFetch } from './use-search-fetch'

export default function SearchBar({
  placeholder = 'Search',
  border = false,
  list,
  fetch,
}: {
  placeholder?: string
  border?: boolean
  list: string[] | undefined
  fetch: (inputValue: string) => void
}): JSX.Element {
  return (
    <div className=" relative max-w-md w-full text-black">
      <div
        className={`
            peer
						flex items-center gap-2
						w-full
						rounded-lg 
						bg-white
						
						outline-[3px] outline-offset-1 
						transition-all
            ease-in 
            focus-within:outline outline-focus-outline
            ${
              border
                ? 'rounded border border-gray-200 hover:border-gray-400 focus-within:border-transparent'
                : 'shadow-sm shadow-gray-300 hover:shadow-lg focus-within:shadow-lg'
            }
            
            `}
      >
        <span className="material-symbols-rounded pl-4 text-gray-400 text-xl leading-none">
          search
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className={`
              min-w-0
							flex-1
							py-3 pr-4
							focus:outline-none
              bg-transparent
          `}
          onChange={e => fetch(e.target.value)}
        />
      </div>

      <div
        className={`
            hidden
            peer-focus-within:block
            focus:block
            hover:block
            absolute z-10 
            w-full 
            mt-2 px-4 py-3 
            rounded-lg 
            border border-gray-100 
            bg-white 
            shadow-lg
            `}
      >
        {list === undefined || list?.length === 0 ? (
          <div>No results</div>
        ) : (
          list?.map((v, idx) => {
            if (v === null || (list.length === 1 && v.length === 0))
              return <div key={idx}>No results</div>
            return <div key={v + idx}>{v}</div>
          })
        )}
      </div>
    </div>
  )
}
