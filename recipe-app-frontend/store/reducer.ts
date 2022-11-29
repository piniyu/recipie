import { combineReducers } from '@reduxjs/toolkit'
import basketSlice from './ingredients-slice'
import recipeServingsSlice from './recipe-servings-slice'

const rootReducer = combineReducers({
  ingredients: basketSlice,
  recipeServings: recipeServingsSlice,
})

export default rootReducer
