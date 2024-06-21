import { ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IBookDetails } from '../BookOverview/BookOverview'
import './BookCartCard.scss'

interface CardProps{
    id?:string;
    image?:string;
    title?:string;
    price?:string;
    authors?:string;
    year?:string;
    calculateSum?:(sum:number)=>void;
}

export function BookCartCard ({ id, image, title, price, authors, year, calculateSum }:CardProps) {
  const [sum, setSum] = useState<number>((price ? +price.slice(1) : 0))
  const [amount, setAmount] = useState<number>(1)

  function deleteBookFromLocalStorage () {
    const books:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string)
    for (let i = 0; i < books.length; i++) {
      if (books[i].isbn13 === id) {
        books.splice(i, 1)
      }
    }
    console.log(books)
    localStorage.setItem('cart', JSON.stringify(books))
  }

  function handleAddSum () {
    setAmount(amount + 1)
    setSum(sum + (price ? +price.slice(1) : 0))
    calculateSum?.((price ? +price.slice(1) : 0))
  }
  function handleRemoveSum () {
    if (amount === 1) {
      console.log('deleted')
      deleteBookFromLocalStorage()
    }
    setAmount(amount - 1)
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
                        <p className='amount'>{amount}</p>
                        <button className='add' onClick={handleAddSum}>+</button>
                </div>
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
