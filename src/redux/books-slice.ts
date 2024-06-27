import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestNewBooks, requestSearch } from '../service/book'
import { IBooksState } from '../interfaces/book'

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

export const fetchSearch = createAsyncThunk('books/fetchSearch', async (params:string, { rejectWithValue }) => {
  try {
    const post = await requestSearch(params)
    return post
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message)
    }
    return rejectWithValue('unknown error')
  }
})

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
    clearAnswer: (state) => {
      state.answer = {}
    }
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
      .addCase(fetchSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.answer = action.payload
        state.pages = Math.ceil((action.payload.total / 10))
      })
      .addCase(fetchSearch.rejected, (state, action) => {
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
export const { clearAnswer } = booksSlice.actions
