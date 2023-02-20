import type { Basket, Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import BasketTable from '~/components/basket/basket-table'
import ContentCard from '~/components/card/content-card'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

type LoaderData = {
  ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[]
} | null

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Basket' + metaTitlePostfix,
})

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const basket = await db.basket.findUnique({
    where: { userId },
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

  return json({ ingredients })
}

export default function BasketIndex(): JSX.Element {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="layout-py layout-px">
      <div className="mx-auto grid max-w-6xl grid-cols-[3fr,2fr] grid-rows-[auto,1fr] gap-6 [grid-template-areas:'header_header''ingredients_sideList']">
        <h2 className="text-black dark:text-gray-200">Basket</h2>
        <div className="[grid-area:ingredients] ">
          {/* --- table --- */}
          <ContentCard className="!p-0">
            <BasketTable data={data?.ingredients} />
          </ContentCard>
          {/* --- /table --- */}
        </div>
        <ContentCard className="flex h-full flex-col gap-8 [grid-area:sideList] ">
          <Outlet />
        </ContentCard>
      </div>
    </div>
  )
}
