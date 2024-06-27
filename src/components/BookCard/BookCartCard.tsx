import { useState } from 'react'
import { IBookDetails } from '../../interfaces/bookDetails'
import { getCartFromLocalStorage } from '../../helpers/getCartFromLocalStorage'
import { addAmount, removeAmount, setAmount } from '../../redux/cart-amount-slice'
import { useDispatch } from 'react-redux'
import { CiTrash } from 'react-icons/ci'
import { ExtendedCardProps } from '../../interfaces/cardProps'
import { NavLink } from 'react-router-dom'
import './BookCartCard.scss'

export function BookCartCard ({ id, image, title, price, authors, year, calculateSum, amount }:ExtendedCardProps) {
  const [sum, setSum] = useState<number>((price ? +price.slice(1) : 0) * amount as number)
  const [newAmount, setNewAmount] = useState<number>(amount as number)
  const dispatch = useDispatch()

  function deleteBookFromLocalStorage () {
    const books:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string)
    for (let i = 0; i < books.length; i++) {
      if (books[i].isbn13 === id) {
        dispatch(setAmount(newAmount - amount))
        books.splice(i, 1)
      }
    }
    localStorage.setItem('cart', JSON.stringify(books))
  }

  function changeAmount (value: boolean) {
    const books = getCartFromLocalStorage()
    if (books) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].isbn13 === id) {
          const currentAmount = books[i].amount ?? 1
          books[i].amount = currentAmount + (value ? 1 : -1)
          localStorage.setItem('cart', JSON.stringify(books))
          break
        }
      }
    }
  }

  function handleAddSum () {
    dispatch(addAmount())
    changeAmount(true)
    setNewAmount(newAmount + 1)
    setSum(sum + (price ? +price.slice(1) : 0))
    calculateSum?.((price ? +price.slice(1) : 0))
  }

  function handleRemoveSum () {
    dispatch(removeAmount())
    changeAmount(false)
    if (amount === 1) {
      deleteBookFromLocalStorage()
    }
    setNewAmount(newAmount - 1)
    setSum(sum - (price ? +price.slice(1) : 0))
    calculateSum?.(-(price ? +price.slice(1) : 0))
  }

  const displaySum:string = `$${sum.toFixed(2)}`

  return (
      <div className="cart-card" id={id}>
        <NavLink to={`/book/${id}`} className="cart-card__cover-container" >
          <div className="cart-card__cover" style={{ backgroundImage: `url(${image})` }}></div>
        </NavLink>
        <div className="cart-card__information">
          <h4 className="cart-card__title">{title}</h4>
          <p className="cart-card__text">by {authors}, Apress {year}</p>
          <div className="cart-card__amount">
            <button className="remove" onClick={handleRemoveSum}>-</button>
              <p className="amount">{newAmount}</p>
            <button className="add" onClick={handleAddSum}>+</button>
          </div>
          <button onClick={deleteBookFromLocalStorage} className="cart-card__delete"><CiTrash size={40}/></button>
        </div>
        <div className="cart-card__price">{displaySum}</div>
      </div>
  )
}
