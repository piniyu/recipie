import TableRow from './table-row'

export type BasketTableRow = {
  item: string
  qat: { value: number; mes: string }
}

export default function BasketTable(): JSX.Element {
  return (
    <div className="table table-auto w-full text-black ">
      <div className="table-header-group font-medium ">
        <div className="table-row ">
          <div className="table-cell min-w-fit text-left border-b-2 border-black">
            INGREDIENTS
          </div>
          <div className="table-cell w-[12%] text-left border-b-2 border-black">
            NEED
          </div>
          <div className="table-cell w-[8%] text-left border-b-2 border-black"></div>
          <div className="table-cell w-[12%] text-left border-b-2 border-black">
            REQUIRE
          </div>
          <div className="table-cell w-[8%] text-left border-b-2 border-black"></div>
          <div className="table-cell text-left border-b-2 border-black">
            HAVE
          </div>
          <div className="table-cell w-14 text-left border-b-2 border-black"></div>
        </div>
      </div>
      {[{ item: 'Noodles', qat: { value: 100, mes: 'g' } }].map((data, idx) => (
        <TableRow key={`${data.item}_${idx}`} data={data} />
      ))}
    </div>
  )
}
