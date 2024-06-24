import { ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IBookDetails, IBookWithAmount } from '../BookOverview/BookOverview'
import './BookCartCard.scss'
import { getCartFromLc } from '../../helpers/getCartFromLocalStorage'
import { addAmount, removeAmount, setAmount } from '../../redux/cart-amount-slice'
import { useDispatch } from 'react-redux'
import { CiTrash } from 'react-icons/ci'

interface CardProps{
    id?:string;
    image?:string;
    title?:string;
    price?:string;
    authors?:string;
    year?:string;
    calculateSum?:(sum:number)=>void;
    amount?:number
}

export function BookCartCard ({ id, image, title, price, authors, year, calculateSum, amount }:CardProps) {
  const [sum, setSum] = useState<number>((price ? +price.slice(1) : 0) * amount as number)
  const [newAmount, setNewAmount] = useState<number>(amount as number)
  const dispatch = useDispatch()
  console.log(newAmount)

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

  function changeAmount (value:boolean) {
    const books = getCartFromLc()
    if (value) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].isbn13 === id) {
          books[i].amount = books[i].amount + 1
          localStorage.setItem('cart', JSON.stringify(books))
        }
      }
    } else {
      for (let i = 0; i < books.length; i++) {
        if (books[i].isbn13 === id) {
          books[i].amount = books[i].amount - 1
          localStorage.setItem('cart', JSON.stringify(books))
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

  if (title) {
    return (
        <div className="cart-card" id={id}>
            <div className="cart-card__cover-container" >
                <div className='cart-card__cover' style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <div className='cart-card__information'>
                <h4 className="cart-card__title">{title}</h4>
                <p className='cart-card__text'>by {authors}, Apress {year}</p>
                <div className='cart-card__amount'>
                        <button className='remove' onClick={handleRemoveSum}>-</button>
                        <p className='amount'>{newAmount}</p>
                        <button className='add' onClick={handleAddSum}>+</button>
                </div>
                <button onClick={deleteBookFromLocalStorage} className='cart-card__delete'><CiTrash size={40}/></button>
            </div>
            <div className="cart-card__price">{displaySum}</div>
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
