import type { Basket, Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { Recipe } from '@prisma/client'
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import BasketTable from '~/components/basket/basket-table'
import ContentCard from '~/components/card/content-card'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'

type LoaderData = {
  basket: Basket & {
    recipes: {
      title: string
      id: string
      ingredientsNum: (NumIngredientOnRecipe & {
        ingredient: Ingredient
      })[]
    }[]
  }
  ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[]
} | null

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Basket' + metaTitlePostfix,
})

export const loader: LoaderFunction = async ({ request }) => {
  const basket = await db.basket.findUnique({
    where: { userId: 'testuser0' },
    include: {
      recipes: {
        select: {
          title: true,
          id: true,
          ingredientsNum: { include: { ingredient: true } },
        },
      },
    },
  })
  let ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[] = []
  basket?.recipes.forEach(({ ingredientsNum }) => {
    const foundIng = ingredients.find(
      ({ ingredientId }) => ingredientId === ingredientsNum[0].ingredientId,
    )
    if (foundIng) {
      foundIng.value += ingredientsNum[0].value
    } else {
      ingredients = ingredients.concat(ingredientsNum)
    }
  })

  return json({ basket, ingredients })
}

export default function BasketIndex(): JSX.Element {
  const data = useLoaderData<LoaderData>()

  // useEffect(() => {
  //   if (searchValue.length === 0) {
  //     return
  //   }
  //   const timeOut = setTimeout(() => {
  //   }, 200)

  //   return () => {
  //     clearTimeout(timeOut)
  //   }
  // }, [searchValue])

  return (
    <div className="layout-py layout-px">
      <div className="max-w-6xl mx-auto grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[3fr,2fr] gap-6">
        {/* <ContentCard className="[grid-area:header] text-black font-semibold"> */}
        <h2>Basket</h2>
        {/* </ContentCard> */}
        <div className="[grid-area:ingredients] ">
          {/* --- table --- */}
          <ContentCard className="!p-0">
            <BasketTable data={data?.ingredients} />
          </ContentCard>
          {/* --- /table --- */}
        </div>
        <ContentCard className="[grid-area:sideList] flex flex-col gap-8 h-full ">
          <Outlet />
        </ContentCard>
      </div>
    </div>
  )
}
