import img1 from '../../../public/assets/img1.jpeg'

export default function CardListItem(): JSX.Element {
  return (
    <div className="flex gap-4 ">
      <div className="w-24">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover object-center "
            src={img1}
          />
        </div>
      </div>
      <h4 className="flex-1 py-2 text-black font-semibold text-sm">title</h4>
      <div className="flex items-center">
        <button className="flex p-1 border border-gray-200 rounded-full">
          <span className="material-symbols-rounded text-lg leading-none text-gray-500">
            close
          </span>
        </button>
      </div>
    </div>
  )
}