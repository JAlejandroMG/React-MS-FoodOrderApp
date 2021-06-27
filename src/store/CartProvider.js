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
      //let updatetItem;
      let updatedItems;

      if (existingCartItem) {
         // updatetItem = {
         const updatetItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
         };
         updatedItems = [...prevState.items];
         updatedItems[existingCartItemIndex] = updatetItem;
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
