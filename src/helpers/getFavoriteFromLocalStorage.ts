import { IBookDetails } from '../../interfaces/bookDetails'

export function getFavoriteFromLocalStorage () {
  const books:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string)
  return books
}
