import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../Container/Container'
import { AppDispatch, RootState } from '../../redux/store'
import React, { useEffect, useState } from 'react'
import { fetchBook } from '../../redux/book-slice'
import { useParams } from 'react-router-dom'
import { addAmount } from '../../redux/cart-amount-slice'
import './BookOverwiew.scss'
import { getCartFromLc } from '../../helpers/getCartFromLocalStorage'
import { CiStar, CiHeart } from 'react-icons/ci'
import { getFavoriteFromLc } from '../../helpers/getFavoriteFromLocalStorage'
import { addFavoriteAmount, removeFavoriteAmount } from '../../redux/favorite-amount-slice'

export interface IBookDetails {
  title: string;
  image: string;
  price: string;
  authors: string;
  publisher: string;
  language: string;
  desc: string;
  isbn13:string;
  year:string;
  rating:string;
}

export interface IBookWithAmount extends IBookDetails{
  amount?:number;
}

export function BookOverview () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state:RootState) => state.book.answer as IBookDetails)
  const previousId:string = useSelector((state:RootState) => state.book.id)
  const { id } = useParams<{id:string}>()
  const [selectedButton, setSelectedButton] = useState<string>('description-btn')
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  function checkInCartLC () {
    const books:IBookWithAmount[] = getCartFromLc() ? getCartFromLc() : []
    for (let index = 0; index < books.length; index++) {
      if (id === books[index].isbn13) {
        return true
      }
    }
    return false
  }

  function handleAddToCart (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.setAttribute('disabled', '')
    target.classList.add('disabled')
    dispatch(addAmount())
    addBookToCartLC(answer)
  }

  function addBookToCartLC (book:IBookDetails) {
    if (localStorage.getItem('cart')) {
      const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string) as IBookDetails[]
      const bookWithAmount:IBookWithAmount = { ...book, amount: 1 }
      localStorageData.push(bookWithAmount)
      localStorage.setItem('cart', JSON.stringify(localStorageData))
      return
    }
    const localStorageData:IBookDetails[] = []
    const bookWithAmount:IBookWithAmount = { ...book, amount: 1 }
    localStorageData.push(bookWithAmount)
    localStorage.setItem('cart', JSON.stringify(localStorageData))
  }

  function checkInFavoriteLC () {
    const books:IBookDetails[] = getFavoriteFromLc() ? getFavoriteFromLc() : []
    for (let index = 0; index < books.length; index++) {
      if (id === books[index].isbn13) {
        return true
      }
    }
    return false
  }

  function handleAddToFavorite (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.classList.add('active')
    addBookToFavoriteLS(answer)
    setIsFavorite(true)
    dispatch(addFavoriteAmount())
  }

  function handleRemoveFromFavorite (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.classList.remove('active')
    removeBookFromFavoriteLS(answer)
    setIsFavorite(false)
    dispatch(removeFavoriteAmount())
  }

  function addBookToFavoriteLS (book:IBookDetails) {
    if (localStorage.getItem('favorite')) {
      const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string) as IBookDetails[]
      localStorageData.push(book)
      localStorage.setItem('favorite', JSON.stringify(localStorageData))
      return
    }
    const localStorageData:IBookDetails[] = []
    localStorageData.push(book)
    localStorage.setItem('favorite', JSON.stringify(localStorageData))
  }

  function removeBookFromFavoriteLS (book:IBookDetails) {
    const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string) as IBookDetails[]
    for (let index = 0; index < localStorageData.length; index++) {
      if (localStorageData[index].isbn13 === book.isbn13) {
        localStorageData.splice(index, 1)
      }
    }
    localStorage.setItem('favorite', JSON.stringify(localStorageData))
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchBook(id))
    }
  }, [id])

  useEffect(() => {
    setIsFavorite(checkInFavoriteLC())
  }, [answer])

  function handleChangeSectionClick (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement
    setSelectedButton(target.className.split(' ')[0])
  }

  function renderAddToCartButton () {
    if (checkInCartLC()) {
      return (
        <button className="book__cart-btn disabled" disabled onClick={handleAddToCart}>
          ADD TO CART
        </button>
      )
    }
    return (
      <button className="book__cart-btn" onClick={handleAddToCart}>
        ADD TO CART
      </button>
    )
  }

  function renderAddToFavoriteButton () {
    if (checkInFavoriteLC()) {
      return (
        <button className="book__favorite-btn active" onClick={handleRemoveFromFavorite}>
        <CiHeart size={50}/>
      </button>
      )
    }
    return (
      <button className="book__favorite-btn" onClick={handleAddToFavorite}>
        <CiHeart size={50}/>
      </button>
    )
  }

  function renderBookInfo () {
    return (
        <div className="book__information">
            <div className="book__cover" style={{ backgroundImage: `url(${answer.image})` }}></div>
            <div className="book__short-information-container">
                <div className="book__short-information">
                    <div className="book__row book__price">
                      <p>{answer.price}</p>
                      <div className="book__rating">
                        <p>{answer.rating}</p>
                        <CiStar size={33}/>
                      </div>
                    </div>
                    <div className="book__row book__authors">
                        <p className="book__text--left">Authors</p>
                        <p className="book__text--right">{answer.authors}</p>
                    </div>
                    <div className="book__row  book__publisher">
                        <p className="book__text--left">Publisher</p>
                        <p className="book__text--right">{answer.publisher}</p>
                    </div>
                    <div className="book__row  book__language">
                        <p className="book__text--left">Language</p>
                        <p className="book__text--right">{answer.language}</p>
                    </div>
                </div>
                {renderAddToCartButton()}
                {renderAddToFavoriteButton()}
            </div>
        </div>
    )
  }

  function renderDescription () {
    switch (selectedButton) {
      case 'description-btn':
        return (
            <div className="book__description">
            <div className="book__buttons-container">
                <button className="description-btn book__button active" onClick={handleChangeSectionClick}>description</button>
                <button className="authors-btn book__button " onClick={handleChangeSectionClick}>authors</button>
                <button className="reviews-btn book__button " onClick={handleChangeSectionClick}>reviews</button>
            </div>
            <p className="description">{answer.desc}</p>
        </div>
        )
      case 'authors-btn':
        return (
            <div className="book__description">
              <div className="book__buttons-container">
                  <button className="description-btn book__button" onClick={handleChangeSectionClick}>description</button>
                  <button className="authors-btn book__button active" onClick={handleChangeSectionClick}>authors</button>
                  <button className="reviews-btn book__button " onClick={handleChangeSectionClick}>reviews</button>
              </div>
            <p className="description">{answer.authors}</p>
        </div>
        )
      case 'reviews-btn':
        return (
            <div className="book__description">
              <div className="book__buttons-container">
                  <button className="description-btn book__button" onClick={handleChangeSectionClick}>description</button>
                  <button className="authors-btn book__button " onClick={handleChangeSectionClick}>authors</button>
                  <button className="reviews-btn book__button active" onClick={handleChangeSectionClick}>reviews</button>
              </div>
            <p className="description">review</p>
        </div>
        )
      default:
        break
    }
  }

  if (previousId === id) {
    return (
    <Container>
        <h1 className="book__title">{answer.title}</h1>
        {renderBookInfo()}
        {renderDescription()}
    </Container>
    )
  }
}
