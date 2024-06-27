import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IBookDetails } from '../../interfaces/bookDetails'
import { Container } from '../Container/Container'
import { BookFavoriteCard } from '../BookCard/BookFavoriteCard'
import { useEffect } from 'react'
import { PageName } from '../PageName/PageName'
import '../BookCard/BookCartCard.scss'

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

    return (
        <Container>
            <PageName>Favorite</PageName>
            {BookCardList(booksList)}
        </Container>
    )
  }

  return (
    <Container>
      <div className="cart__empty">Favorite is empty</div>
    </Container>
  )
}
