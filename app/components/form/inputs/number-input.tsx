import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import AddIcon from '~/components/icons/AddFill1Wght400Grad25Opsz48'
import RemoveIcon from '~/components/icons/RemoveFill1Wght400Grad25Opsz48'

const NumberInput = ({
  hasSetBtn,
  unit,
  registerName,
  maxValue,
  showErrors,
}: {
  showErrors?: boolean
  maxValue?: number
  registerName: string
  hasSetBtn?: boolean
  unit?: string
}) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext()
  const input = watch(registerName)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="flex text-sm">
      {hasSetBtn ? (
        <button
          className=" flex items-center rounded-l-lg border border-r-0 border-gray-200 disabled:text-gray-400 dark:border-gray-600 dark:text-gray-300 dark:disabled:text-gray-600"
          type="button"
          onClick={() => {
            if (inputRef.current && parseInt(inputRef.current.value) > 1) {
              inputRef.current.value = parseInt(inputRef.current.value) - 1 + ''
              setValue('input', parseInt(inputRef.current.value))
            }
          }}
          disabled={input <= 1}
        >
          <RemoveIcon className="svg-sm svg-gray" />
        </button>
      ) : null}
      <input
        {...register(registerName, {
          valueAsNumber: true,
          max: maxValue
            ? { value: maxValue, message: 'Out of quantity' }
            : undefined,
          min: 0,
        })}
        type="number"
        className={`input max-w-[60px] text-right dark:border-gray-600 ${
          errors.input?.message ? 'input-error' : ''
        }
        ${hasSetBtn ? 'rounded-none' : ''}
        `}
        placeholder="0"
        onKeyDown={e => {
          if (
            (!input || (input && input.toString().length === 0)) &&
            e.key === '0'
          ) {
            e.preventDefault()
          }
          if (
            maxValue !== undefined &&
            !isNaN(input) &&
            (input + '').replace('.', '').length ===
              (maxValue + '').replace('.', '').length &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))
          ) {
            e.preventDefault()
          }
          if (e.key === '-') {
            e.preventDefault()
          }
        }}
        ref={el => {
          inputRef.current = el
          register('input').ref(el)
        }}
      />
      {hasSetBtn ? (
        <button
          type="button"
          className="flex items-center rounded-r-lg border border-l-0 border-gray-200  dark:border-gray-600 dark:text-gray-300"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = parseInt(inputRef.current.value) + 1 + ''
              setValue('input', parseInt(inputRef.current.value))
            }
          }}
        >
          <AddIcon className="svg-sm svg-gray" />
        </button>
      ) : null}
      {unit ? <span className="ml-2 flex items-center">{unit}</span> : null}
      {showErrors && (
        <ErrorMessage
          name={registerName}
          errors={errors}
          render={({ message }) => (
            <span className="absolute left-0 top-full text-xs text-red-500 dark:text-red-400">
              {message}
            </span>
          )}
        />
      )}
    </div>
  )
}

export default NumberInput
