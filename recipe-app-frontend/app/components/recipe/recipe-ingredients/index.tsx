import ContentCard from '~/components/card/content-card'
import RecipeIngredientsTable, {
  RecipeTableProps,
} from './recipe-ingredients-table'
import ServingForm from './serving-form'

export default function Index({
  data,
}: {
  data: RecipeTableProps[]
}): JSX.Element {
  return (
    <ContentCard>
      <h3 className="mb-6">Ingredients</h3>
      <RecipeIngredientsTable data={data} />

      <div className="mb-3 border-b border-gray-200"></div>
      <p className="mb-9 text-right text-sm text-gray-400">
        Original recipe yields <b>1</b> servings
      </p>
      <ServingForm />
    </ContentCard>
  )
}
