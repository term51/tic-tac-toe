import React from 'react';
import {calculateWinner} from '../../helpers/helpers';

const Status = props => {
   const winner = calculateWinner(props.currentSquires);
   let status;

   if (winner) {
      status = winner.text;
      if (winner.coordinates) {
         props.currentSquires.winner = winner.coordinates;
      }
   } else {
      status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
   }

   return (
      <div>
         {status}
      </div>
   );
};

export default Status;