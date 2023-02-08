import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products';
import Cart from './components/Cart/Cart';
import Notification from './components/UI/Notification/Notification';
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleNotification } from './store';

const products = [
  {
    id: uuid(),
    unitPrice: 16,
    name: 'Coffee beans 250g',
    desc: 'Whole coffee bean 250 grams'
  },
 {
    id: uuid(),
    unitPrice: 7,
    name: 'Latte glass',
    desc: 'Standard latte glass'
 },
 {
    id: uuid(),
    unitPrice: 16,
    name: 'Cold brew can 200ml',
    desc: 'Cold brew in a can (200ml)'
 }
]

let isInitialLoading = true

function App() {
  const showCart = useSelector(state => state.ui.showCart)
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    if(isInitialLoading) {
      isInitialLoading = false
      return
    }
    dispatch(toggleNotification({
      status: 'success',
      title: 'Saving ...',
      message: 'Saving your cart data'
    }))
    fetch('https://shopping-app-fef0a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart)
    })
    .then(response => {
      if(!response.ok) {
        throw new Error()
      }
      return response.json()
    })
    .then(data => {
      dispatch(toggleNotification({
        status: 'success',
        title: 'Saved...',
        message: 'Cart data is saved.'
      }))
    })
    .catch(error => {
      dispatch(toggleNotification({
        status: 'error',
        title: 'Something went wrong ...',
        message: 'Cart saving was failed'
      }))
    })
   
  }, [cart, dispatch])

  return (
    <>
    {notification && <Notification 
    status={notification.status} 
    message={notification.message}
    title={notification.title}
    />}
    <Layout >
      {showCart && <Cart/>}
      <Products products={products}/>
    </Layout>
    </>
    
  );
}

export default App;
