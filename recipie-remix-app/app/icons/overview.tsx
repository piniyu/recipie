import * as React from 'react'
import { SVGProps } from 'react'

const SvgCarbonGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 3H4.5A1.5 1.5 0 0 0 3 4.5V9a1.5 1.5 0 0 0 1.5 1.5H9A1.5 1.5 0 0 0 10.5 9V4.5A1.5 1.5 0 0 0 9 3Zm0 6H4.5V4.5H9V9Zm10.5-6H15a1.5 1.5 0 0 0-1.5 1.5V9a1.5 1.5 0 0 0 1.5 1.5h4.5A1.5 1.5 0 0 0 21 9V4.5A1.5 1.5 0 0 0 19.5 3Zm0 6H15V4.5h4.5V9ZM9 13.5H4.5A1.5 1.5 0 0 0 3 15v4.5A1.5 1.5 0 0 0 4.5 21H9a1.5 1.5 0 0 0 1.5-1.5V15A1.5 1.5 0 0 0 9 13.5Zm0 6H4.5V15H9v4.5Zm10.5-6H15a1.5 1.5 0 0 0-1.5 1.5v4.5A1.5 1.5 0 0 0 15 21h4.5a1.5 1.5 0 0 0 1.5-1.5V15a1.5 1.5 0 0 0-1.5-1.5Zm0 6H15V15h4.5v4.5Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgCarbonGrid
