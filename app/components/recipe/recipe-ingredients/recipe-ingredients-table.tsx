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
    <div className="mb-8 table">
      <div className="table-row-group">
        {data.map(({ ingredient, ingredientId, unit, value }) => (
          <div className="table-row" key={ingredientId}>
            <div className="table-cell w-full py-3">
              <div className="flex items-center">
                {ingredient.name}
                <span className="mx-3 h-0 flex-1 border-b-2 border-dotted border-gray-300"></span>
              </div>
            </div>
            <div className="table-cell py-3 font-semibold ">
              {value}
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
