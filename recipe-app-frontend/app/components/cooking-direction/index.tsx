import { Link } from '@remix-run/react'
import { useEffect } from 'react'

export default function (): JSX.Element {
  useEffect(() => {
    const body = document.documentElement
    console.log(body)
    const onScroll = (e: Event) => {
      let bodyScrollTop: number
      if (body) {
        bodyScrollTop = body.scrollTop
        // body.style.overflow = 'hidden'
      }
    }
    // document.addEventListener('scroll', onScroll)

    return () => {
      // document.removeEventListener('scroll', onScroll)
      // body!.removeAttribute('style')
      // body!.scrollTop = bodyScrollTop
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 ">
      layout
      <Link to="/recipe">close</Link>
    </div>
  )
}
