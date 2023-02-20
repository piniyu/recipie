import { Link } from '@remix-run/react'

export default function Tag({ text }: { text: string }) {
  return (
    <Link
      className="rounded-full bg-gray-200 py-1.5 px-3 text-sm font-bold text-black dark:bg-gray-600 dark:text-gray-200"
      to="#"
    >
      {text}
    </Link>
  )
}
