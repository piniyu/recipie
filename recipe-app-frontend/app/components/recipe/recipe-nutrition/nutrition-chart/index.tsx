import RadialChart from './radial-chart'

export type NutritionBarChartProps = {
  name: 'Protein' | 'Fat' | 'Soldium' | 'Cholestral'
  pct: number
  qat: { value: number; mes: string }
}

export default function ({
  data,
}: {
  data: NutritionBarChartProps[][]
}): JSX.Element {
  return (
    <>
      {data.map(d => {
        const keyName = d[0].name

        if (keyName === 'Protein') {
          return (
            <RadialChart
              key={keyName}
              fillColorClass="fill-orange-400"
              data={d}
            />
          )
        }
        if (keyName === 'Fat') {
          return (
            <RadialChart
              key={keyName}
              fillColorClass="fill-blue-400"
              data={d}
            />
          )
        }
        if (keyName === 'Soldium') {
          return (
            <RadialChart
              key={keyName}
              fillColorClass="fill-green-400"
              data={d}
            />
          )
        }
        return (
          <RadialChart
            key={keyName}
            fillColorClass="fill-purple-400"
            data={d}
          />
        )
      })}
    </>
  )
}
