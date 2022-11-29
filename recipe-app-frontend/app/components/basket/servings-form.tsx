import { Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store/configure-store'
import { updateRecipeServings } from 'store/recipe-servings-slice'
import NumberInput from '../inputs/number-input'

type FormProps = { input: number }

const ServingsForm = ({
  ingredients,
  recipeId,
  defaultValue = 1,
}: {
  ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[]
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
      ingredients.forEach(({ ingredient }) => {
        dispatch(
          updateRecipeServings({
            servings: value.input,
            recipeId,
          }),
        )
      })
    },
    [dispatch, ingredients, recipeId],
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={e => void e.preventDefault()}>
        <NumberInput
          registerName="input"
          hasSetBtn
          onSubmit={(v: FormProps) => {
            onChangeSubmit(v)
          }}
        />
      </form>
    </FormProvider>
  )
}

export default ServingsForm
