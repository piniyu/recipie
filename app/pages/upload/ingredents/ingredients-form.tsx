import _ from 'lodash'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorMessageComponent } from '~/components/ui/error-message'
import { SelectOpeionType } from '~/components/ui/react-select-custom'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import {
  IngredientsProps,
  updateIngredients,
} from '~/store/upload-temp/ingredients-form-slice'
import { updatePublish } from '~/store/upload-temp/publish-slice'
import { IngredientsListInputs } from './ingredients-name-input'

type IngredientInputProps = {
  name: SelectOpeionType | null
  qty: number
  unit: SelectOpeionType | null
}

export type IngredientsFormProps = {
  serving: number
  ingredients: IngredientInputProps[]
}

export const IngredientsForm = () => {
  const local = useAppSelector(state => state.ingredientsForm)
  const dispatch = useAppDispatch()
  const methods = useForm<IngredientsFormProps>({
    defaultValues: {
      serving: local.servings,
      ingredients: local.ingredients ?? [{ name: null, qty: 0, unit: null }],
    },
    mode: 'onChange',
  })
  const {
    register,
    watch,
    formState: { errors },
  } = methods

  useEffect(() => {
    const filteredIngredients = (
      input: any[] | undefined,
    ): IngredientsProps['ingredients'] | undefined => {
      if (!input) return undefined
      const hasIngredient = input.some(e => e?.name)
      if (hasIngredient) {
        return input.filter((e, i) => e.name !== null)
      }
      return input.slice(undefined, 1)
    }

    const ingredietnFullfill = (
      input: any,
    ): input is {
      [P in keyof IngredientInputProps]: NonNullable<IngredientInputProps[P]>
    }[] => {
      const ingredients = input as IngredientInputProps[]
      return ingredients.every(
        e =>
          (e.name !== null && e.qty > 0 && e.unit !== null) || e.name === null,
      )
    }

    const subscription = watch(
      _.debounce<Parameters<typeof watch>[0]>(
        value => {
          dispatch(
            updateIngredients({
              servings: value.serving ?? 1,
              ingredients: filteredIngredients(value.ingredients),
            }),
          )
          if (
            value.ingredients &&
            value.serving &&
            value.serving > 0 &&
            ingredietnFullfill(value.ingredients)
          ) {
            dispatch(updatePublish({ ingredients: true }))
          } else {
            dispatch(updatePublish({ ingredients: false }))
          }
        },
        300,
        { trailing: true },
      ),
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col space-y-12">
        <label>
          <p className="label-required">Default serving</p>
          <input
            type="number"
            {...register('serving', {
              valueAsNumber: true,
              min: { value: 1, message: "servings can't be 0" },
              required: true,
            })}
            placeholder="1"
            className="input w-12 text-right"
            min={1}
          />
          <span className="ml-2">servings</span>
          <ErrorMessageComponent name="serving" errors={errors} />
        </label>
        <IngredientsListInputs methods={methods} />
      </form>
    </FormProvider>
  )
}
