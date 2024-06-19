import { ReactNode } from 'react'
import './BookCard.scss'

interface CardProps{
    image?:string;
    title?:string;
    subtitle?:string;
    price?:string;
    children?:ReactNode;
}

export function BookCard ({ image, title, subtitle, price, children }:CardProps) {
  if (image && title && subtitle && price && children) {
    return (
        <div className="book-card">
            <div className="book-card__cover">
                {image}
            </div>
            <h4 className="book-card__title">{title}</h4>
            <div className="book-card__subtitle">{subtitle}</div>
            <div className="book-card__price">{price}</div>
        </div>
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
