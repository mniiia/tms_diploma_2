import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { IBookDetails } from '../BookOverview/BookOverview'
import { BookCartCard } from '../BookCard/BookCartCard'
import { Container } from '../Container/Container'
import '../BookCard/BookCartCard.scss'
import { useEffect, useState } from 'react'

// export interface IBookDetails {
//     title: string;
//     image: string;
//     price: string;
//     authors: string;
//     publisher: string;
//     language: string;
//     desc: string;
// }

export function CartBooksList () {
  const [sum, setSum] = useState<number>(0)

  function calcFirstSum () {
    const books:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string)
    let firstSum:number = 0
    for (let index = 0; index < books.length; index++) {
      firstSum += +(books[index].price.slice(1))
      console.log(books[index].price)
    }
    setSum(firstSum)
    return firstSum
  }

  function BookCardList (booksList:IBookDetails[]) {
    return booksList.map(renderBookcard)
  }

  function renderBookcard (book:IBookDetails) {
    return <BookCartCard calculateSum={calculateSum} key={book.isbn13} id={book.isbn13} image={book.image} title={book.title} price={book.price} authors={book.authors} year={book.year}></BookCartCard>
  }

  function calculateSum (oneBookSum:number) {
    console.log(oneBookSum + sum)
    setSum(prevSum => prevSum + oneBookSum)
  }

  useEffect(() => {
    calcFirstSum()
  }, [])

  if (localStorage.getItem('cart')) {
    const booksList:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string)
    return (
        <Container>
            {BookCardList(booksList)}
            <div className='cart-card__calculator'>
                TOTAL: {`$${sum.toFixed(2)}`}
            </div>
        </Container>
    )
  }

  return (
    <div>knig net</div>
  )
}
