import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BasketTableRow } from '.'

export default function TableRowForm({
  data,
  setInputValue,
  isDeleted,
}: {
  data: Pick<BasketTableRow, 'qat'>
  setInputValue: React.Dispatch<React.SetStateAction<number>>
  isDeleted: boolean
}) {
  const {
    qat: { value, mes },
  } = data
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<{ input: number }>({
    mode: 'onChange',
  })
  const inputValue = watch('input')

  useEffect(() => {
    const subscription = watch(v => {
      if (v.input) {
        setInputValue(v.input)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch])
  console.log('render')
  return (
    <form className="relative">
      <input
        type="number"
        className={`input max-w-[60px] text-right ${
          errors.input?.message
            ? 'outline-red-500 bg-red-50 border-red-500 text-red-500'
            : ''
        }`}
        placeholder="0"
        {...register('input', {
          valueAsNumber: true,
          max: { value: value, message: 'Out of original quantity' },
          min: 0,
        })}
        onKeyDown={e => {
          if (
            (!inputValue ||
              inputValue === NaN ||
              (inputValue && inputValue.toString().length === 0)) &&
            e.key === '0'
          ) {
            e.preventDefault()
          }
          if (
            !isNaN(inputValue) &&
            (inputValue + '').replace('.', '').length ===
              (value + '').replace('.', '').length &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))
          ) {
            e.preventDefault()
          }
          if (e.key === '-') {
            e.preventDefault()
          }
        }}
      />
      <span className="ml-3">{mes}</span>
      {!isDeleted && (
        <span className="absolute left-0 top-full text-red-500 text-xs">
          {errors.input?.message}
        </span>
      )}
    </form>
  )
}
