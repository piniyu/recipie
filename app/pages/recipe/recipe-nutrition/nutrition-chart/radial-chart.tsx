import { useState } from 'react'
import {
  LabelList,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'
import { Theme, useTheme } from '~/context/theme-provider'
import type { NutritionBarChartProps } from '.'

export default function RadialChart({
  fillColorClass,
  data,
}: {
  fillColorClass: string
  data: NutritionBarChartProps[]
}): JSX.Element {
  const [theme] = useTheme()
  const [width, setWidth] = useState(0)

  return (
    <ResponsiveContainer
      width="100%"
      aspect={1}
      height="auto"
      debounce={2}
      onResize={width => {
        setWidth(width)
      }}
    >
      <RadialBarChart
        innerRadius="100%"
        data={data}
        startAngle={90}
        endAngle={-180}
        barSize={width / 30}
      >
        <PolarAngleAxis
          type="number"
          dataKey="pct"
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <RadialBar
          id={`radialBar`}
          className={fillColorClass}
          background={theme === Theme.DARK ? { style: { fill: '#555' } } : true}
          dataKey="pct"
          cornerRadius={width / 15}
        >
          <LabelList
            className="fill-inherit font-bold "
            formatter={(v: any) => {
              return v + '%'
            }}
            position="center"
            style={{
              fontSize: width ? width / 100 + 'rem' : '1.875rem',
              transform: width
                ? `translateY(-${width * 0.08}px)`
                : `translateY(-16px)`,
            }}
          />
          <LabelList
            className="fill-black font-bold dark:fill-gray-200 "
            dataKey="name"
            position="centerTop"
            style={{
              fontSize: width ? width / 210 + 'rem' : '1.875rem',
              transform: width
                ? `translateY(${width * 0.05}px)`
                : `translateY(8px)`,
            }}
          />
          <LabelList
            className="fill-gray-500 dark:fill-gray-300"
            dataKey="qat.value"
            formatter={(v: any) => {
              return v + data[0].qat.mes
            }}
            position="centerTop"
            style={{
              fontSize: width ? width / 210 + 'rem' : '1.875rem',
              transform: width
                ? `translateY(${width * 0.15}px)`
                : `translateY(8px)`,
            }}
          />
        </RadialBar>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
