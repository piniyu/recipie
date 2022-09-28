import { useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { BasketTableRow } from '.'
import TableRowForm from './table-row-form'

export default function TableRow({
  data,
}: {
  data: BasketTableRow
}): JSX.Element {
  const {
    item,
    qat: { value, mes },
  } = data
  const [inputValue, setInputValue] = useState(0)
  const [isDeleted, setIsDeleted] = useState(false)

  return (
    <div className={`relative table-row-group text-gray-500 `}>
      <div className="table-row">
        <div className="table-cell py-3 ">
          <div className="flex items-center">
            <span>{item}</span>
            <span className="flex-1 h-0 mx-3 border-b-2 border-gray-300 border-dotted"></span>
          </div>
        </div>
        <div className={`table-cell py-3 text-orange-600 `}>
          {/* <span className=""> */}

          {value - (isNaN(inputValue) ? 0 : inputValue) + mes}
          {/* </span> */}
        </div>
        <div className="table-cell py-3 text-gray-500">=</div>
        <div className="table-cell py-3">
          <div className="flex">{value + mes}</div>
        </div>
        <div className="table-cell py-3 text-gray-500">-</div>
        <div className="table-cell py-3 ">
          <TableRowForm data={data} {...{ setInputValue, isDeleted }} />
        </div>
        <div className="table-cell py-3 text-gray-500">
          <button
            className="flex p-1"
            onClick={() => {
              setIsDeleted(prev => !prev)
            }}
          >
            <span
              className={`${isDeleted ? 'text-green-500' : 'text-red-500'}`}
            >
              {isDeleted ? 'Enable' : 'Delet'}
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
