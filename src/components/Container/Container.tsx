import './Container.scss'
import { ElementProps } from '../../interfaces/ElementProps'

export function Container ({ children }:ElementProps) {
  return (
        <div className="container">{children}</div>
  )
}
