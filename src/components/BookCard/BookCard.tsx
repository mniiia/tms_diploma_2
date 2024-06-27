import { NavLink } from 'react-router-dom'
import { BookCardProps } from '../../interfaces/cardProps'
import './BookCard.scss'

export function BookCard ({ id, image, title, subtitle, price }:BookCardProps) {
  return (
      <NavLink to={`/book/${id}`} className="book-card" id={id}>
        <div className="book-card__cover-container">
          <div className="book-card__cover" style={{ backgroundImage: `url(${image})` }}>
          </div>
        </div>
        <div className="book-card__text">
          <h4 className="book-card__title">{title}</h4>
          <div className="book-card__subtitle">{subtitle}</div>
          <div className="book-card__price">{price}</div>
        </div>
      </NavLink>
  )
}
