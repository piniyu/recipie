import { Difficulty } from '@prisma/client'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface DetailsFormState {
  title: string
  tags: string[]
  difficulty: Difficulty
  thumbnail: { name: string; src: string; type: string; size: string }
}

const initialState: DetailsFormState = {
  tags: [],
  title: '',
  difficulty: 'EASY1',
  thumbnail: { name: '', src: '', type: '', size: '' },
}

const detailsFormSlice = createSlice({
  name: 'details-form',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<DetailsFormState>) => {
      return action.payload
    },
  },
})

export default detailsFormSlice.reducer

export const { updateDetails } = detailsFormSlice.actions
