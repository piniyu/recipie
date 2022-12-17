import { Prisma, Recipe } from '@prisma/client'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { searchFavoriteRecipes } from '~/lib/loaders/search-recipes.server'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'
import { recipesListData } from '.'

type LoaderData = {
  searchRes: Awaited<ReturnType<typeof searchFavoriteRecipes>>
  favRecipes: Prisma.RecipeGetPayload<typeof recipesListData>[]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Favorite' + metaTitlePostfix,
})

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const searchRes = await searchFavoriteRecipes(request, userId)
  const favRecipes = await db.recipe.findMany({
    where: {
      favorite: { some: { userId } },
    },
    ...recipesListData,
    take: 20,
  })
  return json({ searchRes, favRecipes })
}

export default function Favorite(): JSX.Element {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher()
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center gap-6">
        <SearchBar
          placeholder="Favorite Search"
          list={data.searchRes.map(item => ({
            id: item.id,
            value: item.title,
          }))}
          fetch={inputValue => {
            fetcher.load(`/favorite?search=${inputValue}`)
          }}
        />
        {/* </div> */}
        {/* <div className="flex space-x-6"> */}
        <DropdownMenu
          summary="New"
          details={<span>Popular</span>}
          hasDownArrow
        />
        <DropdownMenu
          summary="Filter"
          details={<div>filter checkbox</div>}
          icon={<span className="material-symbols-rounded">tune</span>}
        />
      </div>
      <CardGrid data={data.favRecipes} />
    </div>
  )
}
