import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCart } from '../../store/uiSlice'
import classes from './CartButton.module.css'

const CartButton = () => {
    const totalNumOfItems = useSelector(state => state.cart.totalNumOfItems)
    const dispatch = useDispatch()
    const cartButtonHandler = () => {
       dispatch(toggleShowCart())
    }
    
    return (
        <button className={classes.button} onClick={cartButtonHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalNumOfItems}</span>
        </button>
    )
}

export default CartButton