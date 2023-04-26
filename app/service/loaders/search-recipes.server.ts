import { db } from '../db.server'

function getSearchParams(requestUrl: string) {
  const url = new URL(requestUrl)
  const param = url.searchParams.get('search') ?? ''

  return param
}

export async function searchAllRecipes(request: Request) {
  const param = getSearchParams(request.url)
  const recipes = await db.recipe.findMany({
    where: {
      title: { contains: param, mode: 'insensitive' },
    },
    take: 10,
  })
  const list = recipes.map(recipe => ({ title: recipe.title, id: recipe.id }))
  if (param.length === 0) {
    return []
  }

  return list
}

export async function searchUserRecipes(request: Request, userId: string) {
  const param = getSearchParams(request.url)
  const recipes = await db.recipe.findMany({
    where: {
      authorId: userId,
      title: { contains: param, mode: 'insensitive' },
    },
    take: 10,
  })
  const list = recipes.map(recipe => ({ title: recipe.title, id: recipe.id }))

  return list
}

export async function searchFavoriteRecipes(request: Request, userId: string) {
  const param = getSearchParams(request.url)
  const recipes = await db.recipe.findMany({
    where: {
      favorite: { some: { userId } },
      title: { contains: param, mode: 'insensitive' },
    },
    take: 10,
  })
  const list = recipes.map(recipe => ({ title: recipe.title, id: recipe.id }))
  return list
}
