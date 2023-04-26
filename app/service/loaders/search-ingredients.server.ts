import { db } from '~/service/db.server'

export async function searchIngredients(request: Request) {
  const url = new URL(request.url)
  const param = url.searchParams.get('search-ingredient') ?? ''
  const res = await db.ingredient.findMany({
    where: { name: { contains: param } },
    take: 20,
    orderBy: { name: 'asc' },
  })

  return res
}

export async function searchTags(request: Request) {
  const url = new URL(request.url)
  const param = url.searchParams.get('search-tags') ?? ''
  const res = await db.tag.findMany({
    where: {
      name: { contains: param },
    },
    take: 20,
    orderBy: { name: 'asc' },
  })
  return res
}
