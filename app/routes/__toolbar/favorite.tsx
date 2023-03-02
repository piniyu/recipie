import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { getFavRecipes, getThumbnails } from '~/utils/loaders/query-card-list'
import { searchFavoriteRecipes } from '~/utils/loaders/search-recipes.server'
import { metaTitlePostfix } from '~/root'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Favorite' + metaTitlePostfix,
})

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request)
  const searchRes = await searchFavoriteRecipes(request, userId)
  const recipeOrder = new URL(request.url).searchParams.get('orderby') as
    | 'new'
    | 'popular'
    | null
  const favRecipes = await getFavRecipes({ userId, orderBy: recipeOrder })
  const withThumbnail = await getThumbnails(
    favRecipes.map(e => ({
      recipeId: e.id,
      thumbnails3Key: e.thumbnail?.s3Key ?? '',
    })),
  )
  const mappedRecipes = favRecipes.map(recipe => ({
    ...recipe,
    thumbnail: withThumbnail?.find(e => e.recipeId === recipe.id)?.thumbnail,
    isLiked: !!recipe.favorite.find(e => e.userId === userId),
    isInBasket: !!recipe.baskets.find(e => e.userId === userId),
  }))
  return json({ searchRes, favRecipes: mappedRecipes })
}

export default function Favorite(): JSX.Element {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof loader>()
  const [recipeList, setRecipeList] = useState(data.favRecipes)
  const [listOrder, setListOrder] = useState<'New' | 'Popular'>('New')

  useEffect(() => {
    if (fetcher.data?.favRecipes) {
      setRecipeList(fetcher.data.favRecipes)
    } else {
      setRecipeList(data.favRecipes)
    }
  }, [fetcher.data?.favRecipes, data.favRecipes])
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="mx-auto flex flex-wrap gap-6 md:flex-nowrap">
        <SearchBar
          placeholder="Favorite Search"
          list={data.searchRes.map(item => ({
            link: `/recipe/${item.id}`,
            value: item.title,
          }))}
          fetch={inputValue => {
            fetcher.load(`/favorite?search=${inputValue}`)
          }}
        />

        <DropdownMenu
          summary={listOrder}
          details={
            <ul>
              <li
                className={`drop-down-item ${
                  listOrder === 'New'
                    ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                    : ''
                }`}
                onClick={() => {
                  setListOrder('New')
                  fetcher.load(`/?index&orderby=new`)
                }}
              >
                New
              </li>
              <li
                className={`drop-down-item ${
                  listOrder === 'Popular'
                    ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                    : ''
                }`}
                onClick={() => {
                  setListOrder('Popular')
                  fetcher.load(`/?index&orderby=popular`)
                }}
              >
                Popular
              </li>
            </ul>
          }
          hasDownArrow
        />
        {/* <DropdownMenu
          summary="Filter"
          details={<div>filter checkbox</div>}
          icon={<span className="material-symbols-rounded">tune</span>}
        /> */}
      </div>
      <CardGrid
        data={recipeList.map(recipe => ({
          id: recipe.id,
          thumbnail: recipe.thumbnail?.jpgSrc ?? '',
          author: recipe.author.name ?? recipe.author.email.split('@')[0],
          title: recipe.title,
          isLiked: recipe.isLiked,
          isInBasket: recipe.isInBasket,
          favCounts: recipe.likesNum,
          basketCounts: recipe.basketsNum,
        }))}
      />
    </div>
  )
}
