import { Difficulty } from '@prisma/client'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IngredientsProps {
  servings: number
  ingredients: {
    name: { value: string; label: string } | null
    qty: number
    unit: { value: string; label: string } | null
  }[]
}

const initialState: IngredientsProps = {
  servings: 1,
  ingredients: [{ name: null, qty: 0, unit: null }],
}

const ingredientsFormSlice = createSlice({
  name: 'ingredients-form',
  initialState,
  reducers: {
    updateIngredients: (
      state,
      action: PayloadAction<Partial<IngredientsProps>>,
    ) => {
      /** need deepCopy payload or might cause error */
      const copiedPayload = structuredClone(action.payload)
      return { ...state, ...copiedPayload }
    },
    resetIngredients: () => {
      return initialState
    },
  },
})

export default ingredientsFormSlice.reducer

export const { updateIngredients, resetIngredients } =
  ingredientsFormSlice.actions
