import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
   items: [],
   totalAmount: 0
};

const cartReducer = (prevState, action) => {
   if (action.type === 'ADD') {
      const updatedTotalAmount = prevState.totalAmount + action.item.amount * action.item.price;

      //* Returns the idex of an item if it exists
      const existingCartItemIndex = prevState.items.findIndex(
         item => item.id === action.item.id
      );
      const existingCartItem = prevState.items[existingCartItemIndex];
      //let updatedItem;
      let updatedItems;

      if (existingCartItem) {
         // updatedItem = {
         const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
         };
         updatedItems = [...prevState.items];
         updatedItems[existingCartItemIndex] = updatedItem;
      } else {
         updatedItems = prevState.items.concat(action.item);
      }

      // concat array method returns a new array not affecting prevState (immutability)
      //* Didn't groups amounts by meal
      // const updatedItems = prevState.items.concat(action.item);
      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }
   }

   if (action.type === 'REMOVE') {      
      //* Returns the index of the modified item
      const existingCartItemIndex = prevState.items.findIndex(
         item => item.id === action.id
      );
      //* Gets the modified item
      const existingCartItem = prevState.items[existingCartItemIndex];
      //* Updates the modified item data
      const updatedItem = {
         ...existingCartItem,
         amount: existingCartItem.amount - 1
      };
      //* Updates the amount due of the modified item
      const updatedTotalAmount = prevState.totalAmount - 1 * existingCartItem.price;

      //* Variable for the new array of items after removing one of them
      let updatedItems;
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;

      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }
   };

   return;
};


const CartProvider = props => {
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

   const addItemToCartHandler = item => {
      dispatchCartAction({type: 'ADD', item: item});
   };

   const removeItemfromCartHandler = id => {
      dispatchCartAction({type:'REMOVE', id: id})
   };

   const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemfromCartHandler
   };

   return (
      <CartContext.Provider value={cartContext}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
