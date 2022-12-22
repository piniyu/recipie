import type { IngredientData } from '.'

export type RecipeTableProps = {
  ingredient: string
  qat: number
  mes: string
}
export default function RecipeIngredientsTable({
  data,
}: {
  data: IngredientData[]
}): JSX.Element {
  return (
    <div className="table mb-8">
      <div className="table-row-group">
        {data.map(({ ingredient, ingredientId, unit, value }) => (
          <div className="table-row" key={ingredientId}>
            <div className="table-cell py-3 w-full">
              <div className="flex items-center">
                {ingredient.name}
                <span className="flex-1 h-0 mx-3 border-b-2 border-gray-300 border-dotted"></span>
              </div>
            </div>
            <div className="table-cell py-3 font-semibold text-secondary">
              {value}
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
