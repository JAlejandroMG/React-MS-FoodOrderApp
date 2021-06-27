import { useContext } from 'react';

import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';
import CartIcon from "../Cart/CartIcon";



const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	//* The total amount of items in all meals
	//* Now this constant has a a value of 0
	const numberOfCartItems = cartCtx.items.reduce((totalItemsAmount, item) => {
		return totalItemsAmount + item.amount;
	}, 0);

	return (
		<button className={classes.button} onClick={props.onShowCart} >
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>My Cart</span>
			{/* <span className={classes.badge}>3</span> */}
			<span className={classes.badge}>{ numberOfCartItems }</span>
		</button>
	);
};

export default HeaderCartButton;
