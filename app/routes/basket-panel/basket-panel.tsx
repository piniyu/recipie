import { json, LoaderFunction } from '@remix-run/node'
import { db } from '../../service/db.server'
export const loader: LoaderFunction = async () => {
  const recipes = await db.basket.findFirst({
    where: { userId: 'testuser0' },
    select: { recipes: { select: { id: true, title: true } } },
  })
  return json(recipes)
}
