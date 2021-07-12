import { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = props => {
  const [amountIsValid, setAmoutIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //read entered value by accessing ref value
    const enteredAmount = amountInputRef.current.value;
    //value is always a string, need to convert to number
    const enteredAmountNumber = +enteredAmount;
    //check validation
    if(enteredAmount.trim().length === 0 || 
    enteredAmountNumber < 1 || 
    enteredAmountNumber > 5) {
      setAmoutIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        ref={amountInputRef}
        label="Amount" 
        input ={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
        />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amountm (1-5).</p>}
    </form>

  )
};

export default MealItemForm;