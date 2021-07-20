import React from 'react';

import classes from './CheckoutForm.module.css';

const CheckoutForm = props => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' />
      </div>
      <div className={classes.control}>
        <label htmlFor='phone'>Phone</label>
        <input type='text' id='phone' />
      </div>
      <button type='button' onClick={props.onCancel}>Cancel</button>
      <button>Confirm</button>
    </form>
  )
};

export default CheckoutForm;