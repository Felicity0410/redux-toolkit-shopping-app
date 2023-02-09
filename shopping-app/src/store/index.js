import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './uiSlice'
import { cartSlice } from './cartSlice'


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer
    }
})





