import { combineReducers } from '@reduxjs/toolkit'
import basketSlice from './ingredients-slice'
import recipeServingsSlice from './recipe-servings-slice'
import stepFormSlice from './upload-temp/step-form-slice'
import detailsFormSlice from './upload-temp/details-form-slice'
import ingredientsFormSlice from './upload-temp/ingredients-form-slice'
import publishSlice from './upload-temp/publish-slice'
import siderSlice from './sider-slice'

const rootReducer = combineReducers({
  ingredients: basketSlice,
  recipeServings: recipeServingsSlice,
  stepForm: stepFormSlice,
  detailsForm: detailsFormSlice,
  ingredientsForm: ingredientsFormSlice,
  publishState: publishSlice,
  sider: siderSlice,
})

export default rootReducer
