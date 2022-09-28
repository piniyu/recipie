import BasketTable from '~/components/basket-table'
import CardGrid from '~/components/card/card-grid'
import CardListItem from '~/components/card/card-list-item'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { mockCardGridData } from '.'

export default function Basket(): JSX.Element {
  return (
    <div className="layout-py layout-px grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[1fr,300px] gap-9">
      <h1 className="[grid-area:header] text-black font-semibold">Basket</h1>
      <div className="[grid-area:ingredients] ">
        {/* <h3 className="text-black mb-4 font-medium">Total ingredients</h3> */}
        <div className="flex-1 border border-gray-200 rounded-lg p-9">
          {/* --- table --- */}
          <BasketTable />
          {/* --- /table --- */}
        </div>
      </div>
      <div className="[grid-area:sideList] flex flex-col gap-8 h-full ">
        <SearchBar placeholder="Basket Search" />
        <div>
          <h4 className="mb-4 font-bold text-black">Recipes in basket</h4>
          <CardListItem />
        </div>
      </div>
    </div>
  )
}
