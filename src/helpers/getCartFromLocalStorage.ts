import { IBookWithAmount } from '../components/BookOverview/BookOverview'

export function getCartFromLc () {
  const books:IBookWithAmount[] = JSON.parse(localStorage.getItem('cart') as string)
  return books
}
