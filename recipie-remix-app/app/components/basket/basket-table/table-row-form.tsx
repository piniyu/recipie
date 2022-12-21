import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BasketTableRow } from '.'
import NumberInput from '../../inputs/number-input'

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
  const methods = useForm<{ input: number }>({
    mode: 'onChange',
  })
  const { reset, watch } = methods

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
    <FormProvider {...methods}>
      <form className="relative flex items-stretch ">
        <NumberInput
          registerName="input"
          maxValue={value}
          showErrors
          unit={unit}
        />
      </form>
    </FormProvider>
  )
}
