import type { HeadersFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import CardGrid from '~/components/ui/card/card-grid'
import SearchBar from '~/components/form/inputs/search-bar'
import { getAllRecipes, getThumbnails } from '~/service/loaders/query-card-list'
import { searchAllRecipes } from '~/service/loaders/search-recipes.server'
import { getUserId } from '~/service/session.server'
import { SortingDropdown } from '~/components/ui/sorting-dropdown'

export const headers: HeadersFunction = () => {
  return { 'Cache-Control': 'max-age=3600' }
}

export const loader = async ({ request }: LoaderArgs) => {
  const cacheKey = request.url
  const searchRes = await searchAllRecipes(request)
  const userId = await getUserId(request)
  const recipeOrder = new URL(request.url).searchParams.get('orderby') as
    | 'new'
    | 'popular'
    | null
  const allRecipes = await getAllRecipes({ orderBy: recipeOrder })

  const withThumbnail = await getThumbnails(
    allRecipes.map(e => ({
      recipeId: e.id,
      thumbnails3Key: e.thumbnail?.s3Key ?? '',
    })),
  )
  const mappedRecipes = allRecipes.map(recipe => ({
    ...recipe,
    thumbnail: withThumbnail?.find(e => e.recipeId === recipe.id)?.thumbnail,
    isLiked: !!recipe.favorite.find(e => e.userId === userId),
    isInBasket: !!recipe.baskets.find(e => e.userId === userId),
  }))

  return json(
    { searchRes, allRecipes: mappedRecipes },
    { headers: { 'Cache-Control': 'max-age=3600' } },
  )
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof loader>()
  const [resList, setResList] = useState<typeof data['searchRes']>([])
  const [recipeList, setRecipeList] = useState(data.allRecipes)

  useEffect(() => {
    if (fetcher.data?.searchRes) {
      setResList(fetcher.data.searchRes)
    }
  }, [fetcher.data?.searchRes])

  useEffect(() => {
    if (fetcher.data?.allRecipes) {
      setRecipeList(fetcher.data.allRecipes)
    } else {
      setRecipeList(data.allRecipes)
    }
  }, [fetcher.data?.allRecipes, data.allRecipes])

  return (
    <div className="layout-py layout-px flex flex-col gap-9">
      <div className="mx-auto flex flex-wrap gap-6 md:flex-nowrap">
        <SearchBar
          list={resList?.map(item => ({
            value: item.title,
            link: `/recipe/${item.id}`,
          }))}
          fetch={inputValue => {
            fetcher.load(`/?index&search=${inputValue}`)
          }}
        />
        <SortingDropdown fetcher={fetcher} />
        {/* <DropdownMenu
          summary="Filter"
          details={
            <ul>

            <li>filter checkbox</li>
            <li>filter checkbox</li>
            </ul>
          }
          icon={<span className="material-symbols-rounded">tune</span>}
        /> */}
      </div>

      <CardGrid
        data={recipeList.map(recipe => ({
          id: recipe.id,
          thumbnail: recipe.thumbnail?.url ?? null,
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
