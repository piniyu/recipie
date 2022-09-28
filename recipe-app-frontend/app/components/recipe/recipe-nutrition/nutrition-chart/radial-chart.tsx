import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { RadialBarProps } from 'recharts'
import {
  Label,
  LabelList,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Text,
} from 'recharts'
import { NutritionBarChartProps } from '.'

export default function RadialChart({
  fillColorClass,
  data,
}: {
  fillColorClass: string
  data: NutritionBarChartProps[]
}): JSX.Element {
  const [rpcWidth, setRpcWidth] = useState(0)
  const [hasRpc, setHasRpc] = useState(false)
  const rpcElementRef = useRef<any>(null)
  const rpcRef = useCallback((node: React.MutableRefObject<HTMLDivElement>) => {
    if (node !== null) {
      setRpcWidth(
        (node.current as HTMLDivElement).getBoundingClientRect().width,
      )
      setHasRpc(true)
      rpcElementRef.current = node.current
    }
  }, [])
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const contentBoxSize: ResizeObserverSize = Array.isArray(
            entry.contentBoxSize,
          )
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize
          setRpcWidth(contentBoxSize.blockSize)
        }
      }
    })
    if (hasRpc && rpcElementRef.current) {
      // console.log(rpcElementRef.current)
      resizeObserver.observe(rpcElementRef.current as HTMLDivElement)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [hasRpc, rpcWidth])

  return (
    <ResponsiveContainer
      width="100%"
      aspect={1}
      height="auto"
      debounce={2}
      ref={rpcRef}
    >
      <RadialBarChart
        id="test"
        innerRadius="100%"
        // outerRadius="180"
        data={data}
        startAngle={90}
        endAngle={-180}
        barSize={rpcWidth / 30}
      >
        <PolarAngleAxis
          type="number"
          dataKey="pct"
          domain={[0, 100]}
          // angleAxisId={0}
          tick={false}
          axisLine={false}
        />
        <RadialBar
          id={`radialBar`}
          className={fillColorClass}
          background
          // clockWise={true}
          dataKey="pct"
          cornerRadius={rpcWidth / 15}
        >
          <LabelList
            className="font-ui font-bold "
            formatter={(v: any) => {
              return v + '%'
            }}
            position="center"
            style={{
              fontSize: rpcWidth ? rpcWidth / 100 + 'rem' : '1.875rem',
              transform: rpcWidth
                ? `translateY(-${rpcWidth * 0.08}px)`
                : `translateY(-16px)`,
            }}
          />
          <LabelList
            className="font-bold fill-black "
            dataKey="name"
            position="centerTop"
            style={{
              fontSize: rpcWidth ? rpcWidth / 210 + 'rem' : '1.875rem',
              transform: rpcWidth
                ? `translateY(${rpcWidth * 0.05}px)`
                : `translateY(8px)`,
            }}
          />
          <LabelList
            className="fill-gray-500"
            dataKey="qat.value"
            formatter={(v: any) => {
              return v + data[0].qat.mes
            }}
            position="centerTop"
            style={{
              fontSize: rpcWidth ? rpcWidth / 210 + 'rem' : '1.875rem',
              transform: rpcWidth
                ? `translateY(${rpcWidth * 0.15}px)`
                : `translateY(8px)`,
            }}
          />
        </RadialBar>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
