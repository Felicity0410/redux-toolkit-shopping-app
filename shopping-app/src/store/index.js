import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialUIState = {
    showCart: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
       toggleShowCart: state => {
        state.showCart = !state.showCart
        return state 
      } 
    }
})

const initialCartState = {
    items: [],
    totalNumOfItems: 0
}

const cartSlice = createSlice({
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
        }
    }
})

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer
    }
})


export const { toggleShowCart } = uiSlice.actions

export const { addToCart, addItem, removeItem } = cartSlice.actions
