import { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState();

  const cartCtx = useContext(CartContext);
  //total amount
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  //if the cart has any item
  const hasItems = cartCtx.items.length > 0;

  //remove item
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  //add item
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  };

  //order process
  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  //submit order
  const submitOrderHandler = (userData) => {
    fetch('https://green-meals-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>);
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      <div className={classes.actions}>
        {!isCheckout && <button className={classes['button--alt']} onClick={props.onClose}>Close</button>}
        {hasItems && !isCheckout && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
      </div>
    </Modal>

  );
};

export default Cart;