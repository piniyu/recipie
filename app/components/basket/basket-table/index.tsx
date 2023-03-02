import { Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { useMemo } from 'react'
import { useAppSelector } from '../../../store/configure-store'
import TableRow from './table-row'
import { selectBasket } from '../../../store/selectBasket'

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
    <div className=" w-full  text-black dark:text-gray-200 ">
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
