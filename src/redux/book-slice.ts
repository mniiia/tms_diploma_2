import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestBook } from '../service/book'

export const fetchBook = createAsyncThunk('books/fetchBook', async (id:string, { rejectWithValue }) => {
  try {
    const book = await requestBook(id)
    return book
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message)
    }
    return rejectWithValue('unknown error')
  }
})

interface IBooksState {
  answer: object;
  isLoading: boolean;
  error: string | null;
  id:string;
}

const initialState: IBooksState = {
  answer: {},
  isLoading: false,
  error: null,
  id: '-1'
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.answer = action.payload
        state.id = action.payload.isbn13
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        if (action.error.message === undefined) {
          state.error = ''
        } else {
          state.error = action.error.message
        }
      })
  }
})

export const bookReducer = bookSlice.reducer
