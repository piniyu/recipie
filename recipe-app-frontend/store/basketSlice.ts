import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BasketState {
  name: string
  servings: number
  hadQant: number
}

const initialState: BasketState[] = []

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<BasketState>) => {
      state.push(action.payload)
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.name !== action.payload)
    },
    updateIngredient: (state, action: PayloadAction<BasketState>) => {
      const newState = state.filter(item => item.name !== action.payload.name)
      newState.push(action.payload)
      return newState
    },
    updateHadQuan: (
      state,
      action: PayloadAction<Pick<BasketState, 'hadQant' | 'name'>>,
    ) => {
      const index = state.findIndex(item => item.name === action.payload.name)
      if (index !== -1) {
        state[index].hadQant = action.payload.hadQant
      }
    },
    updateServings: (
      state,
      action: PayloadAction<Pick<BasketState, 'name' | 'servings'>>,
    ) => {
      const index = state.findIndex(item => item.name === action.payload.name)
      if (index !== -1) {
        state[index].servings = action.payload.servings
      }
    },
    addServings: (
      state,
      action: PayloadAction<Pick<BasketState, 'name' | 'servings'>>,
    ) => {
      const index = state.findIndex(item => item.name === action.payload.name)
      if (index !== -1) {
        state[index].servings += action.payload.servings
      } else {
        state.push({
          name: action.payload.name,
          hadQant: 0,
          servings: action.payload.servings,
        })
      }
    },
  },
})

export default basketSlice.reducer

export const {
  addIngredient,
  deleteIngredient,
  updateIngredient,
  updateHadQuan,
  updateServings,
  addServings,
} = basketSlice.actions
