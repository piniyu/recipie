import Card, { CardProps } from './card'

export default function CardGrid({ data }: { data: CardProps[] }): JSX.Element {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-9">
      {data.map(({ title, favCounts, basCounts, user }, idx) => (
        <Card
          key={`${title}_${idx}`}
          {...{ title, favCounts, basCounts, user }}
        />
      ))}
    </div>
  )
}
