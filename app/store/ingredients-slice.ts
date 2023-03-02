import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type RecipeId = string

export interface IngredientsState {
  name: string
  recipeIds: RecipeId[]
  hadQant: number
}

const initialState: IngredientsState[] = []

const basketSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientsState>) => {
      const hasIngredient = state.find(
        item => item.name === action.payload.name,
      )
      if (!hasIngredient) {
        state.push(action.payload)
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.name !== action.payload)
    },

    updateHadQuan: (
      state,
      action: PayloadAction<Pick<IngredientsState, 'hadQant' | 'name'>>,
    ) => {
      const index = state.findIndex(item => item.name === action.payload.name)
      if (index !== -1) {
        state[index].hadQant = action.payload.hadQant
      }
    },
    addRecipeId: (
      state,
      action: PayloadAction<
        Pick<IngredientsState, 'name'> & { recipeId: RecipeId }
      >,
    ) => {
      const ingredientIdx = state.findIndex(
        item => item.name === action.payload.name,
      )
      const hasRecipe = state[ingredientIdx].recipeIds.findIndex(
        id => id === action.payload.recipeId,
      )
      if (hasRecipe === -1) {
        state[ingredientIdx].recipeIds.push(action.payload.recipeId)
      }
    },
    deleteRecipeId: (
      state,
      action: PayloadAction<
        Pick<IngredientsState, 'name'> & { recipeId: RecipeId }
      >,
    ) => {
      const ingredientIdx = state.findIndex(
        item => item.name === action.payload.name,
      )
      const hasRecipe = state[ingredientIdx].recipeIds.findIndex(
        id => id === action.payload.recipeId,
      )
      if (hasRecipe !== -1) {
        const newState = [...state]
        const filterState = newState[ingredientIdx].recipeIds.filter(
          id => id !== action.payload.recipeId,
        )
        if (filterState.length === 0) {
          return state.filter(item => item.name !== action.payload.name)
        } else {
          state[ingredientIdx].recipeIds = filterState
        }
      }
    },
  },
})

export default basketSlice.reducer

export const {
  addIngredient,
  deleteIngredient,
  updateHadQuan,
  addRecipeId,
  deleteRecipeId,
} = basketSlice.actions
