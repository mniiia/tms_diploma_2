import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { IBookDetails } from '../BookOverview/BookOverview'
import { BookCartCard } from '../BookCard/BookCartCard'

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
  function BookCardList (booksList:IBookDetails[]) {
    console.log(booksList)

    return booksList.map(renderBookcard)
  }

  function renderBookcard (book:IBookDetails) {
    console.log(`id=${book.isbn13}, image=${book.image}, title=${book.title}`)

    return <BookCartCard key={book.isbn13} id={book.isbn13} image={book.image} title={book.title} price={book.price}></BookCartCard>
  }

  if (localStorage.getItem('cart')) {
    const booksList:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string)
    console.log(booksList)

    return (
        <div>
            {BookCardList(booksList)}
        </div>
    )
  }

  return (
    <div>knig net</div>
  )
}
