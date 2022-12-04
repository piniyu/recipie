import { ActionFunction, json, LoaderFunction } from '@remix-run/node'
import React from 'react'
import { db } from '../../utils/db.server'
import BasketModal from '../../components/layout/basket-modal'
import { useLoaderData, useNavigate } from '@remix-run/react'
export const loader: LoaderFunction = async () => {
  const recipes = await db.basket.findFirst({
    where: { userId: 'testuser0' },
    select: { recipes: { select: { id: true, title: true } } },
  })
  return json(recipes)
}

export const action: ActionFunction = async ({ request, params }) => {
  console.log(request, params)
  return null
}

export default function BasketPanel() {
  const data = useLoaderData() as {
    recipes: {
      id: string
      title: string
    }[]
  } | null
  const navigate = useNavigate()
  return (
    <BasketModal
      open={true}
      onClose={() => {
        navigate(-1)
      }}
      basketData={data?.recipes}
    />
  )
}
