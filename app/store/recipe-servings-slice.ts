import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RecipeServingState {
  recipeId: string
  servings: number
}

const initialState: RecipeServingState[] = []

const recipeServingsSlice = createSlice({
  name: 'recipe-servings',
  initialState,
  reducers: {
    addRecipeServings: (state, action: PayloadAction<RecipeServingState>) => {
      state.push({ ...action.payload })
    },
    deleteRecipeServings: (
      state,
      action: PayloadAction<Pick<RecipeServingState, 'recipeId'>>,
    ) => {
      return state.filter(item => item.recipeId !== action.payload.recipeId)
    },
    updateRecipeServings: (
      state,
      action: PayloadAction<RecipeServingState>,
    ) => {
      const recipeIdx = state.findIndex(
        item => item.recipeId === action.payload.recipeId,
      )
      if (recipeIdx !== -1) {
        state[recipeIdx].servings = action.payload.servings
      }
    },
  },
})

export default recipeServingsSlice.reducer

export const { addRecipeServings, deleteRecipeServings, updateRecipeServings } =
  recipeServingsSlice.actions
