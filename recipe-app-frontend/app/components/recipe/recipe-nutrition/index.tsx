import ContentCard from '~/components/card/content-card'
import NutritionChart, { NutritionBarChartProps } from './nutrition-chart'

export default function ({
  data,
}: {
  data: NutritionBarChartProps[][]
}): JSX.Element {
  return (
    <ContentCard>
      <p className="text-gray-500">per serving</p>
      <h2 className="text-orange-600 mb-9">542 kcal</h2>
      <h4 className="mb-4 font-bold">Nutrition of per serving</h4>
      <p className="mb-9 text-gray-500">
        The percentage means <b>%Daliy value</b> that tells you how much
        nutrition in a serving of food contributes to a daliy diet. 2,000
        calories a day is used for general nutrition advice.
      </p>
      <div className="w-full grid grid-cols-2 gap-9">
        <NutritionChart data={data} />
      </div>
    </ContentCard>
  )
}
