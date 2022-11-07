import { useRef, useState } from 'react'

export default function ServingForm(): JSX.Element {
  const inputTemplate = useRef<HTMLSpanElement>(null)
  const servingInputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('2')
  return (
    <form>
      <div className="flex items-center justify-center gap-2 text-center mb-6 py-9 text-xl font-bold">
        <span className="">I need </span>
        <div className="relative inline-block min-w-[60px] max-w-[80px] h-9  text-3xl  ">
          <button
            className={`
                    absolute 
                    bottom-full left-1/2 -translate-x-1/2 
                    flex 
                    mb-1 p-1 
                    border border-gray-200 rounded-full`}
            type="button"
            onClick={() => {
              if (servingInputRef.current) {
                servingInputRef.current.stepUp()
                setInputValue(prev => (parseInt(prev) + 1).toString())
              }
            }}
          >
            <span className="material-symbols-rounded text-lg leading-none text-gray-500">
              keyboard_arrow_up
            </span>
          </button>
          <span
            className="whitespace-pre inline-block max-w-[80px] overflow-hidden"
            // ref={inputTemplate}
          >
            {inputValue}
          </span>
          <input
            type="number"
            defaultValue={2}
            className="absolute w-full top-0 left-0 text-center align-top outline-focus-outline"
            // onChange={e => {
            //   console.log(e, inputValue)
            //   // setInputValue(e.target.value)
            //   if (inputTemplate.current) {
            //     inputTemplate.current.textContent = e.target.value
            //   }
            // }}
            onWheel={e => {
              ;(e.target as HTMLElement).blur()
            }}
            // value={inputValue}
            onKeyDown={e => {
              console.log(e.key, inputValue)
              if (
                ((e.target as HTMLInputElement).value.length === 0 &&
                  ['0'].includes(e.key)) ||
                ['.', 'e'].includes(e.key)
              ) {
                e.preventDefault()
              }
            }}
            ref={servingInputRef}
          />
          <button
            className={`
                    absolute 
                    top-full left-1/2 -translate-x-1/2 
                    flex 
                    mt-1 p-1 
                    border border-gray-200 rounded-full
                    ${inputValue === '1' ? 'text-gray-300 ' : 'text-gray-500'}
                    `}
            type="button"
            onClick={e => {
              // if (inputValue === '1') {
              //   e.preventDefault()
              //   return
              // }
              if (servingInputRef.current) {
                servingInputRef.current.stepDown()
                setInputValue(prev => (parseInt(prev) - 1).toString())
              }
            }}
            disabled={inputValue === '1'}
          >
            <span className={`material-symbols-rounded text-lg leading-none  `}>
              keyboard_arrow_down
            </span>
          </button>
        </div>
        <span className=""> Servings</span>
      </div>
      <button
        className="btn-md btn-primary w-full gap-2"
        disabled={inputValue === '1'}
      >
        <span className="material-symbols-rounded text-xl leading-none">
          shopping_basket
        </span>
        Add to basket
      </button>
    </form>
  )
}
