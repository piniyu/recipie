import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { ImageState } from './details-form-slice'

export interface StepFormState {
  id: string
  title: string
  photo: ImageState
  methods: { content: string }[]
}

const initialState: StepFormState[] = [
  {
    id: uuidv4(),
    title: '',
    methods: [{ content: '' }],
    photo: { name: '', src: '', type: '' },
  },
]

const stepFormSlice = createSlice({
  name: 'step-form',
  initialState,
  reducers: {
    addStep: (state, action: PayloadAction<StepFormState>) => {
      const newPayload = structuredClone(action.payload)
      state.push(newPayload)
    },
    updateStep: (state, action: PayloadAction<StepFormState>) => {
      const idx = state.findIndex(step => step.id === action.payload.id)
      const newPayload = structuredClone(action.payload)
      if (idx > -1) {
        state[idx] = newPayload
      }
    },
    deleteStep: (state, action: PayloadAction<Pick<StepFormState, 'id'>>) => {
      return state.filter(step => step.id !== action.payload.id)
    },
    resetStep: () => {
      return initialState
    },
  },
})

export default stepFormSlice.reducer

export const { addStep, updateStep, deleteStep, resetStep } =
  stepFormSlice.actions
