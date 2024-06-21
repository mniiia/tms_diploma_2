import { useDispatch, useSelector } from 'react-redux'
import { BookCard } from '../BookCard/BookCard'
import { Container } from '../Container/Container'
import './NewBooksList.scss'
import { useEffect } from 'react'
import { fetchNewBooks } from '../../redux/books-slice'
import { AppDispatch, RootState } from '../../redux/store'

export function NewBooksList () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state:RootState) => state.books.answer)

  useEffect(() => {
    dispatch(fetchNewBooks())
  }, [])

  interface IBook{
    image:string,
    isbn13:string,
    price:string,
    subtitle:string,
    title:string,
    url:string
  }

  function BookCardList (booksList:IBook[]) {
    console.log(booksList)

    return booksList.map(renderBookcard)
  }

  function renderBookcard (book:IBook) {
    console.log(`id=${book.isbn13}, image=${book.image}, title=${book.title}`)

    return <BookCard key={book.isbn13} id={book.isbn13} image={book.image} title={book.title} subtitle={book.subtitle} price={book.price}></BookCard>
  }

  if ('books' in answer) {
    console.log(answer.books)

    return (
      <Container>
          <div className='books-container'>
            {BookCardList(answer.books)}
          </div>
      </Container>
    )
  }

  return (
    <Container>
        <div className='books-container'>
          Loading...
        </div>
    </Container>
  )
}
