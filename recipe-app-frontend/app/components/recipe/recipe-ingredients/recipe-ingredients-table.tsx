export type RecipeTableProps = {
  ingredient: string
  qat: number
  mes: string
}
export default function RecipeIngredientsTable({
  data,
}: {
  data: RecipeTableProps[]
}): JSX.Element {
  return (
    <div className="table mb-8">
      <div className="table-row-group">
        {data.map(({ ingredient, qat, mes }) => (
          <div className="table-row" key={ingredient}>
            <div className="table-cell py-3 w-full">
              <div className="flex items-center">
                {ingredient}
                <span className="flex-1 h-0 mx-3 border-b-2 border-gray-300 border-dotted"></span>
              </div>
            </div>
            <div className="table-cell py-3 font-semibold text-orange-600">
              {qat}
              {mes}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
