export default function SearchBar({
  placeholder = 'Search',
}: {
  placeholder?: string
}): JSX.Element {
  return (
    <div className=" relative max-w-md w-full text-black">
      <div
        className={`
            peer
						flex items-center gap-2
						w-full
						rounded-lg 
						bg-gray-100 
						
						text-sm 
						outline-[3px] outline-offset-1 
						transition-all
						hover:shadow-lg 
						focus-within:outline outline-focus-outline focus-within:bg-white focus-within:shadow-lg
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
        />
      </div>

      <div
        className={`
            hidden
            peer-focus-within:block
            focus:block
            hover:block
            absolute 
            w-full 
            mt-2 px-4 py-3 
            rounded-lg 
            border border-gray-100 
            bg-white 
            shadow-lg
            `}
      >
        res array
      </div>
    </div>
  )
}
