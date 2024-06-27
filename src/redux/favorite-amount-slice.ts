import { createSlice } from '@reduxjs/toolkit'

interface IFavoriteAmount {
    amount:number
}

const initialState: IFavoriteAmount = {
  amount: 0
}

const favoriteAmountSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteAmount: (state) => {
      state.amount += 1
    },
    removeFavoriteAmount: (state) => {
      state.amount -= 1
    },
    setFavoriteAmount: (state, action) => {
      state.amount = action.payload
    }
  }
})

export const favoriteAmountReducer = favoriteAmountSlice.reducer
export const { addFavoriteAmount, removeFavoriteAmount, setFavoriteAmount } = favoriteAmountSlice.actions
