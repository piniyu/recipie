import { combineReducers, createSlice } from '@reduxjs/toolkit'
import basketSlice from './basketSlice'

const rootReducer = combineReducers({
  basket: basketSlice,
})

export default rootReducer
