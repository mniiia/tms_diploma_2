import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { IBookDetails, IBookWithAmount } from '../BookOverview/BookOverview'
import { BookCartCard } from '../BookCard/BookCartCard'
import { Container } from '../Container/Container'
import '../BookCard/BookCartCard.scss'
import { BookFavoriteCard } from '../BookCard/BookFavoriteCard'
import { useEffect } from 'react'

// export interface IBookDetails {
//     title: string;
//     image: string;
//     price: string;
//     authors: string;
//     publisher: string;
//     language: string;
//     desc: string;
// }

export function FavoriteBooksList () {
  const favoriteAmount = useSelector((state:RootState) => state.favorite.amount)

  useEffect(() => {}, [favoriteAmount])
  function BookCardList (booksList:IBookDetails[]) {
    return booksList.map(renderBookcard)
  }

  function renderBookcard (book:IBookDetails) {
    return <BookFavoriteCard amount={favoriteAmount} key={book.isbn13} id={book.isbn13} image={book.image} title={book.title} price={book.price} authors={book.authors} year={book.year}></BookFavoriteCard>
  }

  if (JSON.parse(localStorage.getItem('favorite') as string) && JSON.parse(localStorage.getItem('favorite') as string).length) {
    const booksList:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string)
    console.log(booksList)

    return (
        <Container>
            {BookCardList(booksList)}
        </Container>
    )
  }

  return (
    <Container>
      <div className='cart__empty'>Favorite is empty</div>
    </Container>
  )
}
