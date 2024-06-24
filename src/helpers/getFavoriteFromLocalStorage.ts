import { IBookDetails } from '../components/BookOverview/BookOverview'

export function getFavoriteFromLc () {
  const books:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string)
  return books
}
