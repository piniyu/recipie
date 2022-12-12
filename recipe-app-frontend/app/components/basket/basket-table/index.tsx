import { Basket, Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { useEffect, useMemo } from 'react'
import {
  addIngredient,
  addRecipeId,
  IngredientsState,
} from '../../../store/ingredients-slice'
import { useAppDispatch, useAppSelector } from '../../../store/configure-store'
import TableRow from './table-row'
import { addRecipeServings } from '../../../store/recipe-servings-slice'
import { BasketState, selectBasket } from '../../../store/selectBasket'

export type BasketTableRow = {
  item: string
  qat: { value: number; mes: string }
}

export default function BasketTable({
  data,
}: {
  data:
    | (NumIngredientOnRecipe & {
        ingredient: Ingredient
      })[]
    | null
    | undefined
}): JSX.Element {
  const selectBasketMemo = useMemo(selectBasket, [])
  const basket = useAppSelector(selectBasketMemo)
  const ingredients = useAppSelector(state => state.ingredients)
  const recipeServings = useAppSelector(state => state.recipeServings)
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   return () => {
  //     data?.forEach(item => {
  //       const haslocal = basket.findIndex(
  //         ({ name }) => name === item.ingredient.name,
  //       )
  //       const hasLocalIngredient = ingredients.findIndex(
  //         ({ name }) => name === item.ingredient.name,
  //       )
  //       const hasLocalRecipe = recipeServings.findIndex(
  //         recipeServing => item.recipeId === recipeServing.recipeId,
  //       )

  //       if (hasLocalIngredient > -1) {
  //         const hasRecipeId = ingredients[
  //           hasLocalIngredient
  //         ].recipeIds.findIndex(id => id === item.recipeId)
  //         if (hasRecipeId === -1) {
  //           dispatch(
  //             addRecipeId({
  //               name: item.ingredient.name,
  //               recipeId: item.recipeId,
  //             }),
  //           )
  //         }
  //       }

  //       if (haslocal === -1) {
  //         dispatch(
  //           addIngredient({
  //             name: item.ingredient.name,
  //             hadQant: 0,
  //             recipeIds: [item.recipeId],
  //           }),
  //         )
  //       }
  //       if (hasLocalRecipe === -1) {
  //         dispatch(addRecipeServings({ recipeId: item.recipeId, servings: 1 }))
  //       }
  //       if (hasLocalIngredient === -1) {
  //         dispatch(
  //           addIngredient({
  //             name: item.ingredient.name,
  //             recipeIds: [item.recipeId],
  //             hadQant: 0,
  //           }),
  //         )
  //       }
  //     })
  //   }
  // }, [])
  // const setItem = (name: string): BasketState => {
  //   if (!data) {
  //     throw 'no data!'
  //   }
  //   const defaultBasket = { name, hadQant: 0, servings: 1 }
  //   const newItem = {
  //     name,
  //     hadQant: defaultBasket.hadQant,
  //     recipeIds: [...data.map(({ recipeId }) => recipeId)],
  //   }
  //   dispatch(addIngredient(newItem))
  //   newItem.recipeIds.forEach(id => {
  //     dispatch(
  //       addRecipeServings({ recipeId: id, servings: defaultBasket.servings }),
  //     )
  //   })
  //   return defaultBasket
  // }
  // const getItem = (baskets: BasketState[], name: string) => {
  //   const item = baskets.find(e => e.name === name)
  //   if (!item) {
  //     return setItem(name)
  //   }
  //   return item
  // }

  return (
    <div className="table table-auto w-full text-black ">
      <div className="table-header-group font-medium ">
        <div className="table-row ">
          <div className="table-cell  text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200">
            INGREDIENTS
          </div>
          <div className="table-cell w-28 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200">
            NEED
          </div>
          {/* <div className="table-cell w-4 text-center px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200"></div> */}
          <div className="table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200">
            REQUIRE
          </div>
          {/* <div className="table-cell w-4 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200"></div> */}
          <div className="table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200">
            HAVE
          </div>
          {/* <div className="table-cell text-center border-b-2 border-black">
            SERVINGS
          </div> */}
          <div className="table-cell w-8 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200"></div>
        </div>
      </div>
      {data?.map(({ ingredient: { name }, value, unit }, idx) => (
        <TableRow
          key={`${name}_${idx}`}
          {...{
            name,
            value: parseInt(value),
            unit,
            localBasket: basket.find(
              ingredient => ingredient.name === name,
            ) ?? { name, hadQant: 0, servings: 1 },
          }}
        />
      ))}
    </div>
  )
}
