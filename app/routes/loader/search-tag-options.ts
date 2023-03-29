import { json, LoaderArgs } from '@remix-run/node'
import { searchTags } from '~/service/loaders/search-ingredients.server'

export const loader = async ({ request }: LoaderArgs) => {
  const searchRes = await searchTags(request)

  return json({ searchTags: searchRes })
}
