import { useDispatch, useSelector } from 'react-redux'
import { BookCard } from '../BookCard/BookCard'
import { Container } from '../Container/Container'
import { useEffect } from 'react'
import { fetchNewBooks } from '../../redux/books-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { renderPagination } from '../Pagination/Pagination'
import { IBook } from '../../interfaces/book'
import { PageName } from '../PageName/PageName'
import './NewBooksList.scss'

export function NewBooksList () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state: RootState) => state.books.answer)
  const amountOnPage = useSelector((state: RootState) => state.books.amountOnPage)
  const pagesCount = useSelector((state: RootState) => state.books.pages as number)
  const { id } = useParams<{ id: string }>()

  // Прокрутка страницы вверх при изменении параметра id
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    dispatch(fetchNewBooks())
  }, [dispatch])

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
        <PageName>new</PageName>
        <div className='books__container'>
          {BookCardList(answer.books)}
        </div>
        <div className='pagination__container'>
          {renderPagination(pagesCount, id ? parseInt(id, 10) : 1, '/new/page/')}
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className='books__container'>
        Loading...
      </div>
    </Container>
  )
}
