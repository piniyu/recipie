import type { NumIngredientOnRecipe } from '@prisma/client'

export const mockNumIngreds: NumIngredientOnRecipe[] = [
  {
    ingredientId: 'testingredient0',
    recipeId: 'testrecipe0',
    unit: 'g',
    value: '100',
  },
  {
    ingredientId: 'testingredient0',
    recipeId: 'testrecipe1',
    unit: 'g',
    value: '100',
  },
  {
    ingredientId: 'testingredient0',
    recipeId: 'testrecipe2',
    unit: 'g',
    value: '100',
  },
]
