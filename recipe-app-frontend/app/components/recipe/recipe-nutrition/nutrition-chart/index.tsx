import RadialChart from './radial-chart'

export type NutritionBarChartProps = {
  name: 'Protein' | 'Fat' | 'Soldium' | 'Cholestral'
  pct: number
  qat: { value: number; mes: string }
}

export default function NutritionChartIndex({
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
              fillColorClass="fill-rose-400"
              data={d}
            />
          )
        }
        if (keyName === 'Fat') {
          return (
            <RadialChart
              key={keyName}
              fillColorClass="fill-green-400"
              data={d}
            />
          )
        }
        if (keyName === 'Soldium') {
          return (
            <RadialChart
              key={keyName}
              fillColorClass="fill-primary-400"
              data={d}
            />
          )
        }
        return (
          <RadialChart key={keyName} fillColorClass="fill-cyan-400" data={d} />
        )
      })}
    </>
  )
}
