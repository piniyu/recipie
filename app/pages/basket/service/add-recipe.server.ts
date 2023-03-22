import { json } from '@remix-run/node'
import { getUserId } from '~/service/session.server'
import { db } from '../../../service/db.server'

export async function deletedbRecipe(request: Request, recipeId: string) {
  const userId = await getUserId(request)
  if (!userId) {
    return null
  }
  const basket = await db.basket.update({
    where: { userId },
    data: { recipes: { disconnect: { id: recipeId } } },
  })
  return json({ basket })
}

export async function getDbRecipe(recipeId: string) {
  const recipe = await db.recipe.findFirstOrThrow({
    where: { id: recipeId },
    select: {
      id: true,
      title: true,
      ingredientsNum: { include: { ingredient: true } },
    },
  })
  return recipe
}
