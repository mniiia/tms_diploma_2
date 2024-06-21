import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../Container/Container'
import { AppDispatch, RootState } from '../../redux/store'
import React, { useEffect, useState } from 'react'
import { fetchBook } from '../../redux/book-slice'
import { useParams } from 'react-router-dom'
import './BookOverwiew.scss'

export interface IBookDetails {
  title: string;
  image: string;
  price: string;
  authors: string;
  publisher: string;
  language: string;
  desc: string;
  isbn13:string;
}

function addBookToCart (book:IBookDetails) {
  if (localStorage.getItem('cart')) {
    console.log(localStorage.getItem('cart'))
    const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string) as IBookDetails[]
    console.log(localStorageData)
    localStorageData.push(book)
    localStorage.setItem('cart', JSON.stringify(localStorageData))
    return
  }

  const booksList:IBookDetails[] = []
  booksList.push(book)
  localStorage.setItem('cart', JSON.stringify(booksList))
}

export function BookOverview () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state:RootState) => state.book.answer as IBookDetails)
  const previousId:string = useSelector((state:RootState) => state.book.id)
  const { id } = useParams<{id:string}>()
  console.log(previousId, id)
  const [selectedButton, setSelectedButton] = useState<string>('description-btn')

  function handleClick (event:React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement
    setSelectedButton(target.className.split(' ')[0])
  }

  function handleAddToCart () {
    addBookToCart(answer)
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchBook(id))
    }
  }, [])

  function renderBookInfo () {
    return (
        <div className='book__information'>
            <div className='book__cover' style={{ backgroundImage: `url(${answer.image})` }}></div>
            <div className='book__short-information-container'>
                <div className='book__short-information'>
                    <div className='information-row book__price'>{answer.price}</div>
                    <div className='information-row book__authors'>
                        <p className='left-text'>Authors</p>
                        <p className='left-text'>{answer.authors}</p>
                    </div>
                    <div className='information-row book__publisher'>
                        <p className='left-text'>Publisher</p>
                        <p className='left-text'>{answer.publisher}</p>
                    </div>
                    <div className='information-row book__language'>
                        <p className='left-text'>Languale</p>
                        <p className='left-text'>{answer.language}</p>
                    </div>
                </div>
                <button className='book__cart-btn' onClick={handleAddToCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    )
  }

  function renderDescription () {
    switch (selectedButton) {
      case 'description-btn':
        return (
            <div className='book__description'>
            <div className='book__buttons-container'>
                <button className='description-btn book__button active' onClick={handleClick}>description</button>
                <button className='authors-btn book__button ' onClick={handleClick}>authors</button>
                <button className='reviews-btn book__button ' onClick={handleClick}>reviews</button>
            </div>
            <p className='description'>{answer.desc}</p>
        </div>
        )
      case 'authors-btn':
        return (
            <div className='book__description'>
            <div className='book__buttons-container'>
                <button className='description-btn book__button' onClick={handleClick}>description</button>
                <button className='authors-btn book__button active' onClick={handleClick}>authors</button>
                <button className='reviews-btn book__button ' onClick={handleClick}>reviews</button>
            </div>
            <p className='description'>{answer.authors}</p>
        </div>
        )
      case 'reviews-btn':
        return (
            <div className='book__description'>
            <div className='book__buttons-container'>
                <button className='description-btn book__button' onClick={handleClick}>description</button>
                <button className='authors-btn book__button ' onClick={handleClick}>authors</button>
                <button className='reviews-btn book__button active' onClick={handleClick}>reviews</button>
            </div>
            <p className='description'>review</p>
        </div>
        )
      default:
        break
    }
  }

  if (previousId === id) {
    return (
    <Container>
        <h1 className='book__title'>{answer.title}</h1>
        {renderBookInfo()}
        {renderDescription()}
    </Container>
    )
  }
}
