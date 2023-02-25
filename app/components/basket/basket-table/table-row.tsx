import { useState } from 'react'
import { updateHadQuan } from '../../../store/ingredients-slice'
import { useAppDispatch } from '../../../store/configure-store'
import TableRowForm from './table-row-form'
import { BasketState } from '../../../store/selectBasket'
import DeleteIcon from '~/components/icons/DeleteFill0Wght400Grad25Opsz48'
import UndoIcon from '~/components/icons/UndoFill0Wght400Grad25Opsz48'

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
    <div
      className={`relative mx-8 my-6 border-b border-gray-200 pb-4 text-inherit last:border-none dark:border-gray-600`}
    >
      <div className="flex items-center space-x-8">
        <div className="flex flex-1 flex-col gap-2 md:flex-row ">
          <b className="flex-1 ">{name}</b>
          <div className="space-y-2">
            <div className=" flex items-center  space-x-1">
              <span className="text-sm text-gray-400">You have: </span>
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
            <p className=" align-baseline text-sm">
              <span className="text-gray-400">You need: </span>
              <span className="text-lg font-bold ">
                {value * localBasket.servings -
                  (isNaN(localBasket.hadQant) ? 0 : localBasket.hadQant) +
                  unit}
              </span>
            </p>
          </div>
        </div>
        <button
          className="flex p-1"
          onClick={() => {
            setIsDeleted(prev => !prev)
          }}
        >
          {isDeleted ? (
            <UndoIcon className="svg-md fill-green-500 dark:fill-green-400 " />
          ) : (
            <DeleteIcon className="svg-md fill-red-600 dark:fill-red-400" />
          )}
        </button>
      </div>
      {isDeleted && (
        <div
          className="absolute top-0 left-0  h-full bg-white/50 mix-blend-screen dark:bg-dark-gray/50 dark:mix-blend-darken"
          style={{ width: 'calc(100% - 56px)' }}
        ></div>
      )}
    </div>
  )
}
