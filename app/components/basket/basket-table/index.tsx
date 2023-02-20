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

  return (
    <div className="table w-full table-auto text-black dark:text-gray-200 ">
      <div className="table-header-group font-medium ">
        <div className="table-row ">
          <div className="table-cell  border-b border-gray-200 px-4 pb-3 pt-9 text-left first:pl-8 last:pr-8 dark:border-gray-600">
            INGREDIENTS
          </div>
          <div className="table-cell w-28 border-b border-gray-200 px-4  pb-3 pt-9 text-left first:pl-8 last:pr-8 dark:border-gray-600">
            NEED
          </div>
          {/* <div className="table-cell w-4 text-center px-4 pt-8 pb-3 pt-9 first:pl-8 last:pr-8 border-b border-gray-200 dark:border-gray-500"></div> */}
          <div className="table-cell border-b border-gray-200 px-4  pb-3 pt-9 text-left first:pl-8 last:pr-8 dark:border-gray-600">
            REQUIRE
          </div>
          {/* <div className="table-cell w-4 text-left px-4 pt-8 pb-3 pt-9 first:pl-8 last:pr-8 border-b border-gray-200 dark:border-gray-500"></div> */}
          <div className="table-cell border-b border-gray-200 px-4  pb-3 pt-9 text-left first:pl-8 last:pr-8 dark:border-gray-600">
            HAVE
          </div>
          {/* <div className="table-cell text-center border-b-2 border-black">
            SERVINGS
          </div> */}
          <div className="table-cell w-8 border-b border-gray-200 px-4  pb-3 pt-9 text-left first:pl-8 last:pr-8 dark:border-gray-600"></div>
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
