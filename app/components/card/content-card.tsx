import { HtmlHTMLAttributes, ReactNode } from 'react'

export default function ContentCard({
  className,
  children,
  ...props
}: {
  className?: string
  children: ReactNode
} & HtmlHTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={`content-card ${className ?? ''}`} {...props}>
      {children}
    </div>
  )
}
