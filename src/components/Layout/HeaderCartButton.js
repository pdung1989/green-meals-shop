import { useContext } from 'react';

import CardIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  //this component will re-evaluate when ever the context changes
  const cartCtx = useContext(CartContext);

 //each item include different number amount of meals
  const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
};

export default HeaderCartButton;