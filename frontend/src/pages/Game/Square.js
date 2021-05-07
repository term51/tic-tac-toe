import React from 'react';
import classes from './Square.module.scss';

const Square = props => {
   const cls = [classes.Square];

   if (props.winner){
      cls.push(classes['winner'])
   }

   return (
      <button
         className={cls.join(' ')}
         onClick={() => props.onSquareClick()}
      >
         {props.value}
      </button>
   );
};
export default Square;
