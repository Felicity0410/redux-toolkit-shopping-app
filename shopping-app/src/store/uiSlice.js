import { createSlice } from '@reduxjs/toolkit'
import { betterSaveCartData } from './thunk-actions'

const initialUIState = {
    showCart: false,
    notification: undefined
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
       toggleShowCart: state => {
        state.showCart = !state.showCart
        return state 
      },
      toggleNotification: (state, {payload}) => {
        const notification = {
            status: payload.status,
            title: payload.title,
            message: payload.message
            
        }

        state.notification = notification
        return state
      }
    },
    extraReducers: (builder) => {
      builder.addCase(betterSaveCartData.fulfilled, (state, action) => {
        const notification = {
          status: 'success',
          title: 'Saved...',
          message: 'Cart data is saved.'
        }

        state.notification = notification
        return state
      })
      builder.addCase(betterSaveCartData.pending, (state, action) => {
        const notification = {
          status: 'success',
          title: 'Saving ...',
          message: 'Saving your cart data'
        }

        state.notification = notification
        return state
      })
      builder.addCase(betterSaveCartData.rejected, (state, action) => {
        const notification = { 
          status: 'error',
          title: 'Something went wrong ...',
          message: 'Cart saving was failed'
        }

        state.notification = notification
        return state
      })
    }
})

export const { toggleShowCart, toggleNotification} = uiSlice.actions