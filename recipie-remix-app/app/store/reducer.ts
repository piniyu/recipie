import { combineReducers } from '@reduxjs/toolkit'
import basketSlice from './ingredients-slice'
import recipeServingsSlice from './recipe-servings-slice'
import stepFormSlice from './upload-temp/step-form-slice'
import detailsFormSlice from './upload-temp/details-form-slice'

const rootReducer = combineReducers({
  ingredients: basketSlice,
  recipeServings: recipeServingsSlice,
  stepForm: stepFormSlice,
  detailsForm: detailsFormSlice,
})

export default rootReducer
