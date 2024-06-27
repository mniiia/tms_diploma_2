import { IBookWithAmount } from '../../interfaces/bookDetails'

export function getCartFromLocalStorage () {
  const books:IBookWithAmount[] = JSON.parse(localStorage.getItem('cart') as string)
  return books
}
