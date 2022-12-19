import { Prisma, Recipe } from '@prisma/client'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import {
  getFavRecipes,
  getLikedAndBasket,
  recipesListData,
} from '~/lib/loaders/query-card-list'
import { searchFavoriteRecipes } from '~/lib/loaders/search-recipes.server'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'
import { CardListLoaderData } from '.'

type LoaderData = {
  searchRes: CardListLoaderData['searcheRes']
  favRecipes: CardListLoaderData['allRecipe']
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Favorite' + metaTitlePostfix,
})

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const searchRes = await searchFavoriteRecipes(request, userId)
  const favRecipes = await getFavRecipes(userId)
  const favRecipesWithLiked = await getLikedAndBasket({
    userId,
    recipes: favRecipes,
  })
  return json({ searchRes, favRecipes: favRecipesWithLiked })
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
