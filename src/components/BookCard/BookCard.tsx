import { ReactNode } from 'react'
import './BookCard.scss'
import { NavLink } from 'react-router-dom'

interface CardProps{
    id?:string;
    image?:string;
    title?:string;
    subtitle?:string;
    price?:string;
    children?:ReactNode;
}

export function BookCard ({ id, image, title, subtitle, price, children }:CardProps) {
  console.log(image && title && subtitle && price)

  if (title && price) {
    return (
        <NavLink to={`/book/${id}`} className="book-card" id={id}>
            <div className="book-card__cover" style={{ backgroundImage: `url(${image})` }}>
            </div>
            <h4 className="book-card__title">{title}</h4>
            <div className="book-card__subtitle">{subtitle}</div>
            <div className="book-card__price">{price}</div>
        </NavLink>
    )
  }

  return (
        <div className="book-card">
            <div className='book-card__cover' style={{ backgroundImage: "url('https://dummyimage.com/200')" }}>
            </div>
            <h4 className="book-card__title">Loading title...</h4>
            <div className="book-card__subtitle">Loading subtitle...</div>
            <div className="book-card__price">Loading price...</div>
        </div>
  )
}
