import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products';
import Cart from './components/Cart/Cart';
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux';

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

function App() {

  const showCart = useSelector(state => state.ui.showCart)

  return (
    <Layout >
      {showCart && <Cart/>}
      <Products products={products}/>
    </Layout>
  );
}

export default App;
