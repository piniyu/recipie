import { Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { useAppDispatch } from '../../../store/configure-store'
import ContentCard from '~/components/ui/card/content-card'
import RecipeIngredientsTable from './recipe-ingredients-table'
import ServingForm from './serving-form'
import { updateRecipeServings } from '../../../store/recipe-servings-slice'
import { useFetcher } from '@remix-run/react'

export type IngredientData = NumIngredientOnRecipe & { ingredient: Ingredient }

export default function Index({
  data,
  defaultServings,
}: {
  data: IngredientData[]
  defaultServings: number
}): JSX.Element {
  const dispatch = useAppDispatch()
  const fetcher = useFetcher()
  return (
    <ContentCard>
      <h3 className="mb-3 md:mb-6">Ingredients</h3>
      <RecipeIngredientsTable data={data} />

      <div className="mb-3 border-b border-gray-200"></div>
      <p className="mb-9 text-right text-sm text-gray-400">
        Original recipe yields <b>{defaultServings}</b> servings
      </p>
      <ServingForm
        defaultServings={defaultServings}
        onSubmit={v => {
          fetcher.submit(null, {
            method: 'post',
            action: `/action/add-basket/${data[0].recipeId}`,
          })
          data.forEach(item => {
            dispatch(
              updateRecipeServings({
                recipeId: item.recipeId,
                servings: v.input,
              }),
            )
          })
        }}
      />
    </ContentCard>
  )
}
