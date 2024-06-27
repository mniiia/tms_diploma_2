import { IBookDetails } from '../../interfaces/bookDetails'
import { setFavoriteAmount } from '../../redux/favorite-amount-slice'
import { useDispatch } from 'react-redux'
import { CiTrash } from 'react-icons/ci'
import { ExtendedCardProps } from '../../interfaces/cardProps'
import { NavLink } from 'react-router-dom'
import './BookCartCard.scss'

export function BookFavoriteCard ({ id, image, title, authors, year, amount }:ExtendedCardProps) {
  const dispatch = useDispatch()

  function deleteBookFromLocalStorage () {
    const books:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string)
    for (let i = 0; i < books.length; i++) {
      if (books[i].isbn13 === id) {
        dispatch(setFavoriteAmount(amount - 1))
        books.splice(i, 1)
      }
    }
    localStorage.setItem('favorite', JSON.stringify(books))
  }

  return (
      <div className="cart-card" id={id}>
        <NavLink to={`/book/${id}`} className="cart-card__cover-container" >
          <div className='cart-card__cover' style={{ backgroundImage: `url(${image})` }}></div>
        </NavLink>
        <div className='cart-card__information'>
          <h4 className="cart-card__title">{title}</h4>
          <p className='cart-card__text'>by {authors}, Apress {year}</p>
        </div>
        <button onClick={deleteBookFromLocalStorage} className='cart-card__delete'><CiTrash size={40}/></button>
      </div>
  )
}
