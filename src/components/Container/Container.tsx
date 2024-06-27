import { ReactNode } from 'react'
import './Container.scss'

interface ElementProps{
  children:ReactNode
}

export function Container ({ children }:ElementProps) {
  return (
      <div className="container">{children}</div>
  )
}
