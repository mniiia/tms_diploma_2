import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface CardProps{
    id?:string;
    image?:string;
    title?:string;
    price?:string;
}

export function BookCartCard ({ id, image, title, price }:CardProps) {
  if (title) {
    return (
        <div className="cart-card" id={id}>
            <div className="cart-card__cover" style={{ backgroundImage: `url(${image})` }}>
            </div>
            <h4 className="cart-card__title">{title}</h4>
            <div className="cart-card__price">{price}</div>
        </div>
    )
  }

  return (
        <div className="cart-card">
            <div className='cart-card__cover' style={{ backgroundImage: "url('https://dummyimage.com/200')" }}>
            </div>
            <h4 className="cart-card__title">Loading title...</h4>
            <div className="cart-card__subtitle">Loading subtitle...</div>
            <div className="cart-card__price">Loading price...</div>
        </div>
  )
}
