import ContentCard from '~/components/ui/card/content-card'
import type { NutritionBarChartProps } from './nutrition-chart'
import NutritionChart from './nutrition-chart'

export default function IngredientsIndex({
  data,
}: {
  data: NutritionBarChartProps[][]
}): JSX.Element {
  return (
    <ContentCard>
      <p className="text-gray-500 dark:text-gray-400">per serving</p>
      <h2 className=" mb-9">542 kcal</h2>
      <h4 className="mb-4 font-bold text-primary">Nutrition of per serving</h4>
      <p className="mb-9 text-gray-500 dark:text-gray-300">
        The percentage means <b>%Daliy value</b> that tells you how much
        nutrition in a serving of food contributes to a daliy diet. 2,000
        calories a day is used for general nutrition advice.
      </p>
      <div className="grid w-full grid-cols-2 gap-9">
        <NutritionChart data={data} />
      </div>
    </ContentCard>
  )
}
