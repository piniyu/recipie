import BasketTable from '~/components/basket-table'
import CardGrid from '~/components/card/card-grid'
import CardListItem from '~/components/card/card-list-item'
import ContentCard from '~/components/card/content-card'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { mockCardGridData } from '.'

export default function Basket(): JSX.Element {
  return (
    <div className="layout-py layout-px">
      <div className="max-w-6xl mx-auto grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[2fr,1fr] gap-6">
        {/* <ContentCard className="[grid-area:header] text-black font-semibold"> */}
        <h2>Basket</h2>
        {/* </ContentCard> */}
        <div className="[grid-area:ingredients] ">
          {/* --- table --- */}
          <ContentCard>
            <BasketTable />
          </ContentCard>
          {/* --- /table --- */}
        </div>
        <ContentCard className="[grid-area:sideList] flex flex-col gap-8 h-full ">
          <SearchBar placeholder="Basket Search" border />
          <div>
            <h4 className="mb-4 font-bold text-black">Recipes in basket</h4>
            <CardListItem />
          </div>
        </ContentCard>
      </div>
    </div>
  )
}
