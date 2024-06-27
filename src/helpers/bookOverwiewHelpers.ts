import { IBookDetails, IBookWithAmount } from '../interfaces/bookDetails'
import { getCartFromLocalStorage } from './getCartFromLocalStorage'
import { getFavoriteFromLocalStorage } from './getFavoriteFromLocalStorage'

// все помощники касающиеся корзины
export function checkInCartLocalStorage (id:string) {
  const books:IBookWithAmount[] = getCartFromLocalStorage() ? getCartFromLocalStorage() : []
  for (let index = 0; index < books.length; index++) {
    if (id === books[index].isbn13) {
      return true
    }
  }
  return false
}

export function addBookToCartLocalStorage (book:IBookDetails) {
  if (localStorage.getItem('cart')) {
    const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('cart') as string) as IBookDetails[]
    const bookWithAmount:IBookWithAmount = { ...book, amount: 1 }
    localStorageData.push(bookWithAmount)
    localStorage.setItem('cart', JSON.stringify(localStorageData))
    return
  }
  const localStorageData:IBookDetails[] = []
  const bookWithAmount:IBookWithAmount = { ...book, amount: 1 }
  localStorageData.push(bookWithAmount)
  localStorage.setItem('cart', JSON.stringify(localStorageData))
}

// все помощники касающиеся избранных
export function checkInFavoriteLocalStorage (id:string) {
  const books:IBookDetails[] = getFavoriteFromLocalStorage() ? getFavoriteFromLocalStorage() : []
  for (let index = 0; index < books.length; index++) {
    if (id === books[index].isbn13) {
      return true
    }
  }
  return false
}

export function addBookToFavoriteLocalStorage (book:IBookDetails) {
  if (localStorage.getItem('favorite')) {
    const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string) as IBookDetails[]
    localStorageData.push(book)
    localStorage.setItem('favorite', JSON.stringify(localStorageData))
    return
  }
  const localStorageData:IBookDetails[] = []
  localStorageData.push(book)
  localStorage.setItem('favorite', JSON.stringify(localStorageData))
}

export function removeBookFromFavoriteLocalStorage (book:IBookDetails) {
  const localStorageData:IBookDetails[] = JSON.parse(localStorage.getItem('favorite') as string) as IBookDetails[]
  for (let index = 0; index < localStorageData.length; index++) {
    if (localStorageData[index].isbn13 === book.isbn13) {
      localStorageData.splice(index, 1)
    }
  }
  localStorage.setItem('favorite', JSON.stringify(localStorageData))
}
