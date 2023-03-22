export default function HeaderImg({ src }: { src: string }): JSX.Element {
  return (
    <div className=" relative flex-1 ">
      <div className=" aspect-w-4 aspect-h-3 overflow-hidden rounded-2xl bg-white dark:bg-gray-600">
        <img src={src} alt="recipe-header-img" />
      </div>
    </div>
  )
}
