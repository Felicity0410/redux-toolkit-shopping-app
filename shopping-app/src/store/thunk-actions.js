import { createAsyncThunk } from "@reduxjs/toolkit"
import { loadToCart } from "./cartSlice"
// import { toggleNotification } from "./uiSlice"


const URL = 'https://shopping-app-fef0a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'

export const betterSaveCartData = createAsyncThunk(
  'ui/saveCartData',
  async (cart) => {
    const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(cart)
    })

    if(!response.ok){
      throw new Error()
    }

    return 
  }
)

export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (arg, {dispatch}) => {
    const response = await fetch(URL, {
      method: 'GET'
    })

    if(!response.ok){
      throw new Error()
    }

    const cartData = await response.json()
    dispatch(loadToCart(cartData))
    return
  }  
)

//action creator
// does not dispatch or return the action itself
//return another function 
//that function if returns will eventually return/dispatch actions

// export const saveCartData = (cart) => {
//     return async (dispatch) => {
//         dispatch(toggleNotification({
//             status: 'success',
//             title: 'Saving ...',
//             message: 'Saving your cart data'
//           }))

//         try {
//             const response = await fetch('https://shopping-app-fef0a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
//                 method: 'PUT',
//                 body: JSON.stringify(cart)
//               })

//             if(!response.ok) {
//             throw new Error()
//             }

//             dispatch(toggleNotification({
//                 status: 'success',
//                 title: 'Saved...',
//                 message: 'Cart data is saved.'
//               }))

//         } catch (error) {
//             dispatch(toggleNotification({
//                 status: 'error',
//                 title: 'Something went wrong ...',
//                 message: 'Cart saving was failed'
//               }))
//         }
//     }
// }