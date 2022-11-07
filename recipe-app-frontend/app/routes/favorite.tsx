import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { mockCardGridData } from '.'

export default function Favorite(): JSX.Element {
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center">
        <SearchBar placeholder="Favorite Search" />
      </div>
      <div className="flex space-x-6">
        <DropdownMenu
          summary="New"
          details={<span>Popular</span>}
          hasDownArrow
        />
        <DropdownMenu
          summary="Filter"
          details={<div>filter checkbox</div>}
          icon={<span className="material-symbols-rounded">tune</span>}
        />
      </div>
      <CardGrid data={mockCardGridData} />
    </div>
  )
}
