import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface SiderState {
  open: boolean
  hidden: boolean
}

const initialState: SiderState = { open: true, hidden: false }

const SiderSlice = createSlice({
  name: 'sider',
  initialState,
  reducers: {
    setSiderOpen: (state, action: PayloadAction<SiderState['open']>) => {
      return { ...state, open: action.payload }
    },
    setSiderHidden: (state, action: PayloadAction<SiderState['hidden']>) => {
      return { ...state, hidden: action.payload }
    },
  },
})

export default SiderSlice.reducer

export const { setSiderOpen, setSiderHidden } = SiderSlice.actions
