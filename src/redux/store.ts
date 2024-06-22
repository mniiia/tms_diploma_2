import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from './books-slice'
import { bookReducer } from './book-slice'
import { cartAmountReducer } from './cart-amount-slice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    cart: cartAmountReducer
  }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
