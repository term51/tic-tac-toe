import React from 'react';
import classes from './Moves.module.scss';

const Moves = props => {
   const movesList = props.history.map((step, move) => {
      const desc = move
         ? 'Go to move #' + move
         : 'Go to game start';

      const buttonClasses = [classes['btn-moves']];
      if (step.select) {
         buttonClasses.push(classes.active);
      }
      return (
         <li key={move}>
            {step.coordinates}
            <button
               className={buttonClasses.join(' ')}
               onClick={() => {
                  props.onJumpTo(move);
                  props.onHighlight(move);
               }}
            >{desc}</button>
         </li>
      );
   });

   const cls = [classes['history-list']];

   if (props.isReverseSort) {
      cls.push(classes['reverse']);
   }
   return (
      <ol className={cls.join(' ')}>{movesList}</ol>
   );
};

export default Moves;
