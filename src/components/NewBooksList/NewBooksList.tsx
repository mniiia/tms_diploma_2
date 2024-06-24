import { useDispatch, useSelector } from 'react-redux'
import { BookCard } from '../BookCard/BookCard'
import { Container } from '../Container/Container'
import './NewBooksList.scss'
import { useEffect } from 'react'
import { fetchNewBooks } from '../../redux/books-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { renderPagination } from '../Pagination/Pagination'

export function NewBooksList () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state: RootState) => state.books.answer)
  const amountOnPage = useSelector((state: RootState) => state.books.amountOnPage)
  const pagesCount = useSelector((state: RootState) => state.books.pages as number)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    // Прокрутка страницы вверх при изменении параметра id
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    dispatch(fetchNewBooks())
  }, [dispatch])

  interface IBook {
    image: string,
    isbn13: string,
    price: string,
    subtitle: string,
    title: string,
    url: string,
    amount?: number
  }

  function BookCardList (booksList: IBook[]) {
    const newBookList = []
    const currentPage = id ? parseInt(id, 10) : 1
    for (let index = (currentPage - 1) * amountOnPage; index < currentPage * amountOnPage && index < booksList.length; index++) {
      newBookList.push(renderBookcard(booksList[index]))
    }
    return newBookList
  }

  function renderBookcard (book: IBook) {
    return (
      <BookCard
        key={book.isbn13}
        id={book.isbn13}
        image={book.image}
        title={book.title}
        subtitle={book.subtitle}
        price={book.price}
      />
    )
  }

  if (answer && 'books' in answer) {
    return (
      <Container>
        <div className='books-container'>
          {BookCardList(answer.books)}
        </div>
        <div className='pagination-container'>
          {renderPagination(pagesCount, id ? parseInt(id, 10) : 1, '/new/page/')}
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
