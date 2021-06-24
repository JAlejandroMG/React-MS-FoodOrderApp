import classes from './Input.module.css';



const Input = props => {
   return (
      <div className={classes.input}>
         <label htmlFor={props.input.id}>{ props.label }</label>
         {/* El props.input.id ya esta incluido con el spread operator}*/}
         <input
            //id={props.input.id} No requiere llevarlo
            { ...props.input }
         />
      </div>
   );
};

export default Input;
