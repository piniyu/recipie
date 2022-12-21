import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './configure-store'
import type { IngredientsState } from './ingredients-slice'

const ingredientsSelector = (state: RootState) => state.ingredients
const recipeServingsSelector = (state: RootState) => state.recipeServings

export type BasketState = Pick<IngredientsState, 'name' | 'hadQant'> & {
  servings: number
}

export const selectBasket = () =>
  createSelector(
    ingredientsSelector,
    recipeServingsSelector,
    (ingredients, recipes) => {
      const basket = ingredients.map(ingredient => {
        const newServings = ingredient.recipeIds.map(
          id => recipes.find(item => item.recipeId === id)?.servings ?? 0,
        )
        return {
          name: ingredient.name,
          hadQant: ingredient.hadQant,
          servings:
            newServings.length > 0 ? newServings.reduce((a, b) => a + b, 0) : 0,
        }
      })
      return basket
    },
  )
