import { ReactNode } from 'react'
import './PageName.scss'

interface IProps{
    children:ReactNode
}

export function PageName ({ children }:IProps) {
  return (
        <div className='page-name'>{children}</div>
  )
}
