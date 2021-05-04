import React from 'react';
import {calculateWinner} from '../../helpers/helpers';
import {FIRST_PLAYER, SECOND_PLAYER} from '../../constants';

const Status = props => {
   const winner = calculateWinner(props.currentSquires);
   let status;

   if (winner) {
      status = winner.text;
      if (winner.coordinates) {
         props.currentSquires.winner = winner.coordinates;
      }
   } else {
      status = 'Next player: ' + (props.xIsNext ? FIRST_PLAYER : SECOND_PLAYER);
   }

   return (
      <div>
         {status}
      </div>
   );
};

export default Status;