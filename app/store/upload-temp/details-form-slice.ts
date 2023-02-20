import { Difficulty } from '@prisma/client'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ImageState = {
  name: string
  src: string
  type: string
} | null
export interface DetailsFormState {
  title: string
  tags: { value: string; label: string }[] | null
  difficulty: Difficulty
  thumbnail: ImageState
}

const initialState: DetailsFormState = {
  tags: null,
  title: '',
  difficulty: 'EASY1',
  thumbnail: { name: '', src: '', type: '' },
}

const detailsFormSlice = createSlice({
  name: 'details-form',
  initialState,
  reducers: {
    updateDetails: (
      state,
      action: PayloadAction<Partial<DetailsFormState>>,
    ) => {
      const newState = structuredClone(action.payload)
      return { ...state, ...newState }
    },
    resetDetails: () => {
      return initialState
    },
  },
})

export default detailsFormSlice.reducer

export const { updateDetails, resetDetails } = detailsFormSlice.actions
