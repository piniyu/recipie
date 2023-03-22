import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import NumberInput from '../../../components/form/inputs/number-input'

export default function TableRowForm({
  value,
  unit,
  setInputValue,
  defaultValue,
}: {
  value: number
  unit?: string
  setInputValue: (value: number) => void
  defaultValue: number | undefined
}) {
  const methods = useForm<{ input: number }>({
    mode: 'all',
  })
  const {
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = methods

  useEffect(() => {
    if (defaultValue) {
      reset({ input: defaultValue })
    }
  }, [defaultValue, reset])

  useEffect(() => {
    trigger('input')
  }, [getValues('input')])

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
