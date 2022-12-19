import { ActionFunction, json, LoaderFunction } from '@remix-run/node'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { getUserId, requireUserId } from '~/utils/session.server'

// export const loader: LoaderFunction = async ({ request, params }) => {
//   const userId = await requireUserId(request)
//   const recipeId = params.recipeId
//   if (!recipeId || typeof recipeId !== 'string') {
//     throw new Error('recipe not exist!')
//   }
//   const isLiked = await db.favorite.findFirst({
//     where: { userId, recipes: { some: { id: recipeId } } },
//     select: { id: true },
//   })
//   return json(isLiked)
// }

async function requireFav(userId: string) {
  const hasFav = await db.favorite.findFirst({
    where: { userId },
    select: { id: true },
  })
  if (!hasFav) {
    await db.favorite.create({
      data: { userId },
    })
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  //  const form=await request.formData()
  //  const recipeId=form.get('recipeId')

  const recipeId = params.recipeId

  if (!recipeId || typeof recipeId !== 'string') {
    return badRequest({ formError: 'Recipe not exsit!' })
  }
  await requireFav(userId)
  const isLiked = await db.favorite.findFirst({
    where: { recipes: { some: { id: recipeId } }, userId },
    select: { id: true },
  })

  if (!isLiked) {
    await db.favorite.update({
      where: { userId },
      data: { recipes: { connect: { id: recipeId } } },
    })
  } else {
    await db.favorite.update({
      where: { userId },
      data: { recipes: { disconnect: { id: recipeId } } },
    })
  }
  return null
}
