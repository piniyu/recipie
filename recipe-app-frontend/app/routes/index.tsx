import { Icon } from '@iconify-icon/react'
import Card from '~/components/card/card'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'

export const mockCardGridData = [
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
]

export default function Index() {
  const userName = 'user name'
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center">
        <SearchBar />
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
      {/* <h1 className="[font-family:var(--font-ui)] font-bold text-black">Hi {userName}
        <br /> Share your amazing recipes with everyone now!</h1> */}
      {/* <div className='flex items-center'>
        <Icon className='flex-1 text-9xl' icon='emojione:pot-of-food' />
        <Icon className='flex-1 text-9xl' icon='emojione-v1:pot-of-food' />
        <Icon className='flex-1 text-9xl' icon='emojione:curry-rice' />
        <Icon className='flex-1 text-9xl' icon='noto-v1:curry-rice' />
        <Icon className='flex-1 text-9xl' icon='emojione-v1:hamburger' />
      </div> */}
      <CardGrid data={mockCardGridData} />
    </div>
  )
}
