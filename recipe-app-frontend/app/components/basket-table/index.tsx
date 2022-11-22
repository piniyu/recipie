import { Basket, Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { useEffect } from 'react'
import { addIngredient, BasketState } from 'store/basketSlice'
import { useAppDispatch, useAppSelector } from 'store/configureStore'
import TableRow from './table-row'

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
  /* TODO:'servings' should be implemented in side recipe, so the redux and ui should be modified */
  const basket = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()
  const getItem = (basketArr: BasketState[], name: string) => {
    const item = basketArr.find(e => e.name === name)
    if (!item) {
      const newItem = { name, hadQant: 0, servings: 1 }
      dispatch(addIngredient(newItem))
      return newItem
    }
    return item
  }
  useEffect(() => {
    console.log(basket)
  }, [basket])

  return (
    <div className="table table-auto w-full text-black ">
      <div className="table-header-group font-medium ">
        <div className="table-row ">
          <div className="table-cell min-w-fit text-left border-b-2 border-black">
            INGREDIENTS
          </div>
          <div className="table-cell text-left border-b-2 border-black">
            NEED
          </div>
          <div className="table-cell text-center border-b-2 border-black"></div>
          <div className="table-cell text-center border-b-2 border-black">
            REQUIRE
          </div>
          <div className="table-cell text-left border-b-2 border-black"></div>
          <div className="table-cell text-center border-b-2 border-black">
            HAVE
          </div>
          <div className="table-cell text-center border-b-2 border-black">
            SERVINGS
          </div>
          <div className="table-cell w-14 text-left border-b-2 border-black"></div>
        </div>
      </div>
      {data?.map(({ ingredient: { name }, value, unit }, idx) => (
        <TableRow
          key={`${name}_${idx}`}
          {...{
            name,
            value: parseInt(value),
            unit,
            localBasket: getItem(basket, name),
          }}
        />
      ))}
    </div>
  )
}
