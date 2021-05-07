import React from 'react';
import {FIRST_PLAYER, SECOND_PLAYER} from '../../constants';

const Status = props => {
   let status;
   if (props.winner) {
      status = props.winner.text;
   } else {
      status = 'Next player: ' + (props.xIsNext ? FIRST_PLAYER : SECOND_PLAYER);
   }

   return (<div>{status}</div>);
};

export default Status;