import { useContext, useEffect, useState } from 'react';

import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';
import CartIcon from "../Cart/CartIcon";



const HeaderCartButton = (props) => {
	const [btnIsHighlighted, SetBtnIsHighlighted] = useState(false);

	const cartCtx = useContext(CartContext);

	//* The total amount of items in all meals
	//* Now this constant has a a value of 0
	const numberOfCartItems = cartCtx.items.reduce((totalItemsAmount, item) => {
		return totalItemsAmount + item.amount;
	}, 0);


	const { items } = cartCtx;

	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

	useEffect(() => {
		//* Si no hay elementos aquí se detiene
		if (items.length === 0) {
			return;
		}

		//* Se modifica el estado de manera que se aplica la clase bump
		SetBtnIsHighlighted(true);

		//* Se modifica el estado desepués de 300 ms con lo que se puede volver a aplicar la clase bump
		const timer = setTimeout(() => {
			SetBtnIsHighlighted(false);
		}, 300);

		//* Se elimina el contador antes que se elimine el componente
		return () => {
			clearTimeout(timer);
		};
	}, [items])


	return (
		<button className={btnClasses} onClick={props.onShowCart} >
		{/* <button className={classes.button} onClick={props.onShowCart} > */}
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
