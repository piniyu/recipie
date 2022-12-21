import { Link } from '@remix-run/react'

export default function Tag({ text }: { text: string }) {
  return (
    <Link
      className="py-1.5 px-3 bg-gray-200 text-sm text-black font-bold rounded-full"
      to="#"
    >
      {text}
    </Link>
  )
}
