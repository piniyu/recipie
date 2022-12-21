import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { db } from '~/utils/db.server'
import { getUserId, requireUserId } from '~/utils/session.server'

async function userBasket(userId: string) {
  return !!(await db.basket.findFirst({
    where: { userId },
    select: { id: true },
  }))
}

async function updateBasket({
  recipeId,
  userId,
}: {
  recipeId: string
  userId: string
}) {
  const hasBasket = await userBasket(userId)
  if (!hasBasket) {
    await db.basket.create({
      data: { userId },
    })
  }
  const isInBasket = await db.basket.findFirst({
    where: {
      userId,
      recipes: { some: { id: recipeId } },
    },
  })
  if (!isInBasket) {
    await db.basket.update({
      where: { userId },
      data: { recipes: { connect: { id: recipeId } } },
    })
  } else {
    await db.basket.update({
      where: { userId },
      data: { recipes: { disconnect: { id: recipeId } } },
    })
  }
  return null
}

// export const loader: LoaderFunction = async ({ request, params }) => {
//   const userId = await getUserId(request)
//   if (!userId) {
//   }
// }

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const recipeId = params.recipeId
  if (!recipeId) {
    throw new Error('Recipe no exist!')
  }

  await updateBasket({ recipeId, userId })

  return null
}
