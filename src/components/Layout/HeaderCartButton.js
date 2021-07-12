import { useContext, useEffect, useState } from 'react';

import CardIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  //this component will re-evaluate when ever the context changes
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
 //each item include different number amount of meals
  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  //make the animation to the cart button using bump
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    //set timer to the effect
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300)
    //clear the timer with cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
};

export default HeaderCartButton;