import { ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IBookDetails, IBookWithAmount } from '../BookOverview/BookOverview'
import './BookCartCard.scss'
import { getCartFromLc } from '../../helpers/getCartFromLocalStorage'
import { setFavoriteAmount } from '../../redux/favorite-amount-slice'
import { useDispatch } from 'react-redux'
import { CiTrash } from 'react-icons/ci'

interface CardProps{
    id?:string;
    image?:string;
    title?:string;
    price?:string;
    authors?:string;
    year?:string;
    amount:number
}

export function BookFavoriteCard ({ id, image, title, authors, year, amount }:CardProps) {
  const dispatch = useDispatch()

  function deleteBookFromLocalStorage () {
    const books:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string)
    for (let i = 0; i < books.length; i++) {
      if (books[i].isbn13 === id) {
        console.log(amount, amount - 1)
        dispatch(setFavoriteAmount(amount - 1))
        books.splice(i, 1)
      }
    }
    localStorage.setItem('favorite', JSON.stringify(books))
  }

  if (title) {
    return (
        <div className="cart-card" id={id}>
            <div className="cart-card__cover-container" >
                <div className='cart-card__cover' style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <div className='cart-card__information'>
                <h4 className="cart-card__title">{title}</h4>
                <p className='cart-card__text'>by {authors}, Apress {year}</p>
            </div>
            <button onClick={deleteBookFromLocalStorage} className='cart-card__delete'><CiTrash size={40}/></button>
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
