import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
   items: [],
   totalAmount: 0
};

const cartReducer = (prevState, action) => {
   if (action.type === 'ADD') {
      // concat array method returns a new array not affecting prevState (immutability)
      const updatedItems = prevState.items.concat(action.item);
      const updatedTotalAmount = prevState.totalAmount + action.item.amount * action.item.price;
      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }
   }
   return;
};



const CartProvider = props => {
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

   const addItemToCartHandler = item => {
      dispatchCartAction({type: 'ADD', item: item});
   };

   const removeItemfromCartHandler = id => {
      dispatchCartAction({tpe:'REMOVE', id: id})
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
