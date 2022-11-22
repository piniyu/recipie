import { useState } from 'react'
import type { BasketState } from 'store/basketSlice'
import { updateHadQuan, updateServings } from 'store/basketSlice'
import { useAppDispatch } from 'store/configureStore'
import TableRowForm from './table-row-form'

export default function TableRow({
  name,
  value,
  unit,
  localBasket,
}: {
  name: string
  value: number
  unit: string
  localBasket: BasketState
}): JSX.Element {
  const [isDeleted, setIsDeleted] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <div className={`relative table-row-group text-secondary `}>
      <div className="table-row">
        <div className="table-cell py-3 ">
          <div className="flex items-center">
            <span>{name}</span>
            <span className="flex-1 h-0 mx-3 border-b-2 border-gray-300 border-dotted"></span>
          </div>
        </div>
        <div
          className={`
          relative 
          table-cell 
          py-3 
          text-secondary font-bold 
          text-lg
          `}
        >
          <span className="[background:linear-gradient(to_bottom,transparent_50%,#fbbf2490_50%)]">
            {value * localBasket.servings -
              (isNaN(localBasket.hadQant) ? 0 : localBasket.hadQant) +
              unit}
          </span>
        </div>
        <div className="table-cell py-3 text-gray-500">=</div>
        <div className="table-cell py-3">
          <div className="text-center">
            {value * localBasket.servings + unit}
          </div>
        </div>
        <div className="table-cell py-3 text-gray-500">-</div>
        <div className="table-cell py-3 ">
          <TableRowForm
            {...{
              setInputValue: (value: number) =>
                void dispatch(updateHadQuan({ name, hadQant: value })),
              defaultValue: localBasket?.hadQant ?? 0,
              isDeleted,
              value,
              unit,
            }}
          />
        </div>
        <div className="table-cell py-3 align-bottom">
          <TableRowForm
            {...{
              setInputValue: (value: number) =>
                void dispatch(updateServings({ name, servings: value })),
              defaultValue: localBasket?.servings ?? 1,
              isDeleted,
              value,
              hasSetBtn: true,
            }}
          />
        </div>
        <div className="table-cell align-middle py-3 text-gray-500">
          <button
            className="flex p-1"
            onClick={() => {
              setIsDeleted(prev => !prev)
            }}
          >
            <span
              className={`material-symbols-outlined leading-none ${
                isDeleted ? 'text-green-500' : 'text-red-600'
              }`}
            >
              {isDeleted ? 'undo' : 'delete'}
            </span>
          </button>
        </div>
      </div>
      {isDeleted && (
        <div
          className="absolute top-0 left-0  h-full bg-white/50 mix-blend-screen"
          style={{ width: 'calc(100% - 56px)' }}
        ></div>
      )}
    </div>
  )
}
