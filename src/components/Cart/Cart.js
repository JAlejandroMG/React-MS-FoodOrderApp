import { useContext } from 'react';

import classes from "./Cart.module.css";
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Modal from "../UI/Modal";



const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = item => {};

	const cartItemRemoveHandler = id => {};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{/* [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
				<li key={item.id}>{item.name}</li>
			)) */}
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={() => cartItemAddHandler(item)}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onHideCart={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
			<div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
         </div>
		</Modal>
	);
};

export default Cart;


// return (
// 	<Modal onHideCart={props.onHideCart}>
// 	{/* <div> */}
// 		{cartItems}
// 		<div className={classes.total}>
// 			<span>Total Amount</span>
// 			<span>$35.62</span>
// 		</div>
// 		<div className={classes.actions}>
// 			<button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
// 			<button className={classes.button}>Order</button>
// 		</div>
// 	{/* </div> */}
// 	</Modal>
// );
