import { useDispatch, useSelector } from 'react-redux'
import { BookCard } from '../BookCard/BookCard'
import { Container } from '../Container/Container'
import { useEffect, useRef } from 'react'
import { fetchSearch } from '../../redux/books-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { renderPagination } from '../Pagination/Pagination'

export function SearchResults () {
  const dispatch = useDispatch<AppDispatch>()
  const answer = useSelector((state: RootState) => state.books.answer)
  const pagesCount = useSelector((state: RootState) => state.books.pages as number)
  const { id } = useParams<{ id: string }>()
  const { query } = useParams<{ query: string }>()

  useEffect(() => {
    // Прокрутка страницы вверх при изменении параметра id
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    if (query) {
      dispatch(fetchSearch(`${query}/${id}`))
    }
  }, [dispatch, id, query])

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

    for (let index = 0; index < booksList.length; index++) {
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

  if ('total' in answer && answer.total !== '0' && 'books' in answer && query) {
    console.log(answer)

    return (
      <Container>
        <div className='search__results'>
            <p>Search results for: &quot;{query}&quot;</p>
        </div>
        <div className='books__container'>
          {BookCardList(answer.books)}
        </div>
        <div className='pagination__container'>
          {renderPagination(pagesCount, id ? parseInt(id, 10) : 1, `/search/${query}/`)}
        </div>
      </Container>
    )
  }

  return (
    <Container>
        <div className='books__text'>
            <p className='search__results'>
                Search results for: &quot; {query} &quot;
            </p>
            <p className='no-results'>
                NO RESULTS
            </p>
        </div>
    </Container>
  )
}
