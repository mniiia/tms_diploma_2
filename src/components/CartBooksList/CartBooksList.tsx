import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IBookWithAmount } from '../BookOverview/BookOverview'
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
  const cartAmount = useSelector((state:RootState) => state.cart.amount)

  function calcFirstSum () {
    if (JSON.parse(localStorage.getItem('cart') as string)) {
      const books:IBookWithAmount[] = JSON.parse(localStorage.getItem('cart') as string)
      let firstSum:number = 0
      for (let index = 0; index < books.length; index++) {
        const amount:number = books[index].amount ?? 1
        firstSum += (+(books[index].price.slice(1)) * amount)
        console.log(books[index].price)
      }
      setSum(firstSum)
      return firstSum
    }
    return 0
  }

  function BookCardList (booksList:IBookWithAmount[]) {
    return booksList.map(renderBookcard)
  }

  function renderBookcard (book:IBookWithAmount) {
    return <BookCartCard
     calculateSum={calculateSum}
      amount={book.amount ?? 1}
      key={book.isbn13}
      id={book.isbn13}
      image={book.image}
      title={book.title}
      price={book.price}
      authors={book.authors}
      year={book.year}
      ></BookCartCard>
  }

  function calculateSum (oneBookSum:number) {
    console.log(oneBookSum + sum)
    setSum(prevSum => prevSum + oneBookSum)
  }

  useEffect(() => {
  }, [cartAmount])

  useEffect(() => {
    calcFirstSum()
  }, [])

  if (JSON.parse(localStorage.getItem('cart') as string) && JSON.parse(localStorage.getItem('cart') as string).length) {
    const booksList:IBookWithAmount[] = JSON.parse(localStorage.getItem('cart') as string)
    console.log(booksList)

    return (
        <Container>
            {BookCardList(booksList)}
            <div className='cart__calculator'>
                TOTAL: {`$${sum.toFixed(2)}`}
            </div>
        </Container>
    )
  }

  return (
    <Container>
      <div className='cart__empty'>Cart is empty</div>
    </Container>
  )
}
