import { createSlice } from '@reduxjs/toolkit'

interface ICartAmount {
    amount:number
}

const initialState: ICartAmount = {
  amount: 0
}

const cartAmountSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addAmount: (state) => {
      state.amount += 1
    },
    removeAmount: (state) => {
      state.amount -= 1
    },
    setAmount: (state, action) => {
      state.amount = action.payload
    }
  }
})

export const cartAmountReducer = cartAmountSlice.reducer
export const { addAmount, removeAmount, setAmount } = cartAmountSlice.actions
