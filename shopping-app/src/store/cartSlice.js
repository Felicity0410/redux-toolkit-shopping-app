import { createSlice } from '@reduxjs/toolkit'

const initialCartState = {
    items: [],
    totalNumOfItems: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state, {payload: itemToAdd}) => {
            //add to existing (to cart) item
            const existingItem = state.items.find(item => item.id === itemToAdd.id)
            if(existingItem) {
                existingItem.quantity += 1
                existingItem.totalPrice += existingItem.unitPrice
            } else {
                state.items.push({
                    ...itemToAdd,
                    quantity: 1,
                    totalPrice: itemToAdd.unitPrice
                })
            }
            //add a new item (not yet in the cart)

            state.totalNumOfItems += 1
            return state
        },
        addItem: (state, {payload: itemId}) => {
            const existingItem = state.items.find(item => item.id === itemId)
            existingItem.quantity += 1
            existingItem.totalPrice += existingItem.unitPrice
            state.totalNumOfItems += 1
            return state
        },
        removeItem: (state, {payload: itemId}) => {
            const existingItem = state.items.find(item => item.id === itemId)
            if (existingItem.quantity === 1) {
               state.items = state.items.filter(item => item.id !== itemId)
            } else {
                existingItem.quantity -= 1
                existingItem.totalPrice -= existingItem.unitPrice
            }
            state.totalNumOfItems -= 1
            return state         
        },
        loadToCart: (state, {payload}) => {
            state.items = payload.items
            state.totalNumOfItems = payload.totalNumOfItems
            return state
        }
    }
})

export const { addToCart, addItem, removeItem, loadToCart } = cartSlice.actions