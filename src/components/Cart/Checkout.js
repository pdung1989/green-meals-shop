import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

//helper functions to validate entered value
const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {

  const [formIsValidity, setFormIsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();
    //access entered values 
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    //validate each entered value
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    //set the state to the new object where assigns new values to all properties
    setFormIsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid
    });

    //validate the whole form
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid
    if (!formIsValid) {
      return;
    }

    //submit the user data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    })
  }
  //change the css class if the value is invalid
  const nameControlClasses = `${classes.control} 
    ${formIsValidity.name ? '' : classes.invalid}`;

  const streetControlClasses = `${classes.control} 
    ${formIsValidity.street ? '' : classes.invalid}`;

  const postalControlClasses = `${classes.control} 
    ${formIsValidity.postal ? '' : classes.invalid}`;

  const cityControlClasses = `${classes.control} 
    ${formIsValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formIsValidity.name && <p>Please entered the valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formIsValidity.street && <p>Please entered the valid street.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formIsValidity.postal && <p>Please entered the valid postal code.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formIsValidity.city && <p>Please entered the valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;