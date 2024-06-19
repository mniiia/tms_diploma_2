import { BookCard } from '../BookCard/BookCard'
import { Container } from '../Container/Container'
import './AllBooksForm.scss'

export function AllBooksForm () {
  return (
    <Container>
        <div className='books-container'>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
        </div>
    </Container>
  )
}
