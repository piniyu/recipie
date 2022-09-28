import * as React from 'react'
import { SVGProps } from 'react'

const SvgIonBasketOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.206 9a.955.955 0 0 0-.956.947.838.838 0 0 0 .038.258L4.71 18.75a1.897 1.897 0 0 0 1.833 1.383h10.912a1.916 1.916 0 0 0 1.842-1.383l2.424-8.545.028-.258A.955.955 0 0 0 20.794 9H3.206Zm9.062 7.503a1.973 1.973 0 1 1 1.982-1.972 1.981 1.981 0 0 1-1.982 1.972Z"
      stroke="#402410"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M7.5 9 12 3l4.5 6"
      stroke="#402410"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgIonBasketOutline
