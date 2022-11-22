import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BasketTableRow } from '.'

export default function TableRowForm({
  value,
  unit,
  setInputValue,
  isDeleted,
  hasSetBtn,
  defaultValue,
}: {
  value: number
  unit?: string
  setInputValue: (value: number) => void
  isDeleted: boolean
  hasSetBtn?: boolean
  defaultValue: number | undefined
}) {
  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ input: number }>({
    mode: 'onChange',
  })
  const input = watch('input')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (defaultValue) {
      reset({ input: defaultValue })
      console.log(defaultValue)
    }
  }, [defaultValue, reset])

  useEffect(() => {
    const subscription = watch(v => {
      if (v.input) {
        setInputValue(v.input)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setInputValue, watch])

  return (
    <form className="relative flex items-stretch justify-center">
      {hasSetBtn ? (
        <button
          className=" flex items-center rounded-l-lg border border-r-0 border-gray-200 disabled:text-gray-400"
          type="button"
          onClick={() => {
            if (inputRef.current && parseInt(inputRef.current.value) > 1) {
              inputRef.current.value = parseInt(inputRef.current.value) - 1 + ''
              setValue('input', parseInt(inputRef.current.value))
              console.log(input)
            }
          }}
          disabled={input <= 1}
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
      ) : null}
      <input
        {...register('input', {
          valueAsNumber: true,
          max: { value: value, message: 'Out of original quantity' },
          min: 0,
        })}
        type="number"
        className={`input max-w-[60px] text-right ${
          errors.input?.message
            ? 'outline-red-500 bg-red-50 border-red-500 text-red-500'
            : ''
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
            !isNaN(input) &&
            (input + '').replace('.', '').length ===
              (value + '').replace('.', '').length &&
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
          className="flex items-center border border-l-0 border-gray-200 rounded-r-lg"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = parseInt(inputRef.current.value) + 1 + ''
              setValue('input', parseInt(inputRef.current.value))
            }
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      ) : null}
      {unit ? <span className="ml-2 flex items-center">{unit}</span> : null}
      {!isDeleted && (
        <span className="absolute left-0 top-full text-red-500 text-xs">
          {errors.input?.message}
        </span>
      )}
    </form>
  )
}
