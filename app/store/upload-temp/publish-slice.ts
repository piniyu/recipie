import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PublishState {
  details: boolean
  ingredients: boolean
  steps: boolean
}

const initialState: PublishState = {
  details: false,
  ingredients: false,
  steps: false,
}

const PublishSlice = createSlice({
  name: 'details-form',
  initialState,
  reducers: {
    updatePublish: (state, action: PayloadAction<Partial<PublishState>>) => {
      return { ...state, ...action.payload }
    },
    resetPublish: () => {
      return initialState
    },
  },
})

export default PublishSlice.reducer

export const { updatePublish, resetPublish } = PublishSlice.actions
