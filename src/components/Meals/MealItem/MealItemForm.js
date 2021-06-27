import { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';



const MealItemForm = props => {
   const [amountIsValid, setAmountIsValid] = useState(true);
   //* Cannot be used directly in custom components like <Input />
   const amountInputRef = useRef();

   const submitHandler = event => {
      event.preventDefault();

      //* The value from the ref is always a string
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
         setAmountIsValid(false);
         return;
      };

      //* Here I just pass the entered amount, I still need id, name and price of the meal
      props.onAddToCart(enteredAmountNumber);
   };

   return (
      <form className={classes.form} onSubmit={submitHandler}>
         <Input
            ref={amountInputRef}
            label="Amount"
            input={{
               id: props.id,
               type: 'number',
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '0'
            }}
         />
         <button>+ Add</button>
         {!amountIsValid &&  <p>Please enter a vallid amount (1-5).</p>}
      </form>
   );
};

export default MealItemForm;
