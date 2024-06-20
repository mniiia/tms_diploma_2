import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestNewBooks } from '../service/book'

export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (_, { rejectWithValue }) => {
  try {
    const post = await requestNewBooks()
    console.log(post)
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
  isLoading: boolean;
  error: string | null;
}

const initialState: IBooksState = {
  answer: {},
  isLoading: false,
  error: null
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
