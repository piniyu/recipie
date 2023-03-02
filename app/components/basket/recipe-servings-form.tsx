import { Form } from '@remix-run/react'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/configure-store'
import { updateRecipeServings } from '../../store/recipe-servings-slice'
import NumberInput from '../inputs/number-input'

type FormProps = { input: number }

const ServingsForm = ({
  recipeId,
  defaultValue = 1,
}: {
  recipeId: string
  defaultValue?: number
}) => {
  const methods = useForm<FormProps>({
    defaultValues: { input: defaultValue },
    mode: 'onChange',
  })
  const dispatch = useAppDispatch()
  /** submit on change **/
  const onChangeSubmit = useCallback(
    (value: FormProps) => {
      dispatch(
        updateRecipeServings({
          servings: value.input,
          recipeId,
        }),
      )
    },
    [dispatch, recipeId],
  )
  useEffect(() => {
    methods.reset({ input: defaultValue })
  }, [defaultValue, methods])
  return (
    <FormProvider {...methods}>
      <Form onSubmit={e => void e.preventDefault()}>
        <NumberInput
          registerName="input"
          hasSetBtn
          // onSubmit={(v: FormProps) => {
          //   onChangeSubmit(v)
          // }}
        />
      </Form>
    </FormProvider>
  )
}

export default ServingsForm
