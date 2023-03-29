import { json, LoaderArgs } from '@remix-run/node'
import { searchIngredients } from '~/service/loaders/search-ingredients.server'

export const loader = async ({ request }: LoaderArgs) => {
  const searchRes = await searchIngredients(request)

  return json({ searchRes })
}
