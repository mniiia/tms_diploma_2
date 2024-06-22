import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestNewBooks } from '../service/book'

export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (_, { rejectWithValue }) => {
  try {
    const post = await requestNewBooks()
    return post
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message)
    }
    return rejectWithValue('unknown error')
  }
})

interface IBook {
  image: string;
  isbn13: string;
  price: string;
  subtitle: string;
  title: string;
  url: string;
}

interface IBooksState {
  answer: {
    books: IBook[];
  } | object;
  pages:number
  isLoading: boolean;
  error: string | null;
  amountOnPage:number;
}

const initialState: IBooksState = {
  answer: {},
  isLoading: false,
  error: null,
  pages: 0,
  amountOnPage: 9
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNewBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.answer = action.payload
        state.pages = Math.ceil((action.payload.total / 9))
      })
      .addCase(fetchNewBooks.rejected, (state, action) => {
        state.isLoading = false
        if (action.error.message === undefined) {
          state.error = ''
        } else {
          state.error = action.error.message
        }
      })
  }
})

export const booksReducer = booksSlice.reducer
