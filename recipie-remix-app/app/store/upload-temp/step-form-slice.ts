import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface StepFormState {
  id: string
  title: string
  methods: { content: string; timeStamp: string }[]
}

const initialState: StepFormState[] = []

const stepFormSlice = createSlice({
  name: 'step-form',
  initialState,
  reducers: {
    addStep: (state, action: PayloadAction<StepFormState>) => {
      state.push(action.payload)
    },
    updateStep: (state, action: PayloadAction<StepFormState>) => {
      const idx = state.findIndex(step => step.id === action.payload.id)
      if (idx > -1) {
        state[idx] = action.payload
      }
    },
    deleteStep: (state, action: PayloadAction<Pick<StepFormState, 'id'>>) => {
      return state.filter(step => step.id !== action.payload.id)
    },
  },
})

export default stepFormSlice.reducer

export const { addStep, updateStep, deleteStep } = stepFormSlice.actions
