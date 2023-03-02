import { ActionFunction } from '@remix-run/node'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { requireUserId } from '~/utils/session.server'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const recipeId = params.recipeId
  if (!recipeId) {
    throw new Error('Recipe no exist!')
  }

  const isInBasket = await db.basket.findFirst({
    where: { userId, recipes: { some: { id: recipeId } } },
  })

  await db.basket.upsert({
    where: { userId },
    create: { userId, recipes: { connect: { id: recipeId } } },
    update: {
      recipes:
        isInBasket !== null
          ? { disconnect: { id: recipeId } }
          : { connect: { id: recipeId } },
    },
  })

  const basketCounts = await db.recipe.findFirst({
    where: { id: recipeId },
    select: { basketsNum: true },
  })

  if (!basketCounts)
    return badRequest({ message: 'cannot find basketCounts in recipe!' })

  const oldBasketsNum = basketCounts.basketsNum

  await db.recipe.update({
    where: { id: recipeId },
    data: { basketsNum: isInBasket ? oldBasketsNum - 1 : oldBasketsNum + 1 },
  })

  return null
}
