import type { Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import BasketTable from '~/pages/basket/basket-table'
import ContentCard from '~/components/ui/card/content-card'
import Modal from '~/components/ui/modal'
import { metaTitlePostfix } from '~/root'
import { db } from '~/service/db.server'
import { requireUserId } from '~/service/session.server'
import useResizeObserver from 'use-resize-observer'

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

  return json({ ingredients }, { headers: { 'Cache-Control': 'max-age=3600' } })
}

export default function BasketIndex(): JSX.Element {
  const data = useLoaderData<LoaderData>()
  const [hideSider, setHideSider] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width && width <= 850) {
        setHideSider(true)
      } else {
        setHideSider(false)
      }
    },
  })

  return (
    <div className="layout-py layout-px" ref={ref}>
      <div
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto] grid-rows-[auto,1fr]  [grid-template-areas:'header_header''ingredients_sideList'] ${
          hideSider ? 'gap-y-6' : 'gap-6'
        }`}
      >
        <div className="flex">
          <h2 className="flex-1 text-black dark:text-gray-200">Basket</h2>
          {hideSider ? (
            <button
              className="btn-sm btn-primary"
              onClick={e => {
                e.stopPropagation()
                setOpenModal(true)
              }}
            >
              Open recipe list
            </button>
          ) : null}
        </div>
        <div className="[grid-area:ingredients] ">
          {/* --- table --- */}
          <ContentCard className="">
            <BasketTable data={data?.ingredients} />
          </ContentCard>
          {/* --- /table --- */}
        </div>
        {hideSider ? (
          <Modal
            dialogClassName="mt-20"
            className="w-[90vw] max-w-3xl md:w-[60vw]"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ContentCard className="flex h-full  flex-col gap-8  ">
              <Outlet />
            </ContentCard>
          </Modal>
        ) : (
          <ContentCard className="flex h-full min-w-[384px] flex-col gap-8 [grid-area:sideList] ">
            <Outlet />
          </ContentCard>
        )}
      </div>
    </div>
  )
}
