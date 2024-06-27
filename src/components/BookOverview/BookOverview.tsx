import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../Container/Container'
import { AppDispatch, RootState } from '../../redux/store'
import React, { useEffect, useState } from 'react'
import { fetchBook } from '../../redux/book-slice'
import { useParams } from 'react-router-dom'
import { addAmount } from '../../redux/cart-amount-slice'
import { CiStar, CiHeart } from 'react-icons/ci'
import { addFavoriteAmount, removeFavoriteAmount } from '../../redux/favorite-amount-slice'
import { IBookDetails } from '../../interfaces/bookDetails'
import { checkInCartLocalStorage, addBookToCartLocalStorage, checkInFavoriteLocalStorage, addBookToFavoriteLocalStorage, removeBookFromFavoriteLocalStorage } from '../../helpers/bookOverwiewHelpers'
import './BookOverwiew.scss'

export function BookOverview () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state:RootState) => state.book.answer as IBookDetails)
  const previousId:string = useSelector((state:RootState) => state.book.id)
  const { id } = useParams<{id:string}>()
  const [selectedButton, setSelectedButton] = useState<string>('description-btn')
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchBook(id))
    }
  }, [id])

  useEffect(() => {
    checkInFavoriteLocalStorage(id ?? '')
  }, [answer, isFavorite])

  function handleAddToCart (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.setAttribute('disabled', '')
    target.classList.add('disabled')
    dispatch(addAmount())
    addBookToCartLocalStorage(answer)
  }

  function handleAddToFavorite (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.classList.add('active')
    addBookToFavoriteLocalStorage(answer)
    setIsFavorite(true)
    dispatch(addFavoriteAmount())
  }

  function handleRemoveFromFavorite (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLAnchorElement
    target.classList.remove('active')
    removeBookFromFavoriteLocalStorage(answer)
    setIsFavorite(false)
    dispatch(removeFavoriteAmount())
  }

  function handleChangeSectionClick (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement
    setSelectedButton(target.className.split(' ')[0])
  }

  function renderAddToCartButton () {
    if (checkInCartLocalStorage(id ?? '')) {
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
    if (checkInFavoriteLocalStorage(id ?? '')) {
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
            <div className='book__cover-container'>
              <div className="book__cover" style={{ backgroundImage: `url(${answer.image})` }}></div>
            </div>
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
