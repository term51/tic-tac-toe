import React from 'react';
import classes from './SortButton.module.scss';
import {FaSortAmountDown, FaSortAmountDownAlt} from 'react-icons/all';

const SortButton = props => {
   return (
      <button className={classes.SortButton} onClick={() => props.onToggleSort()}>
         {props.isReverseSort ? <FaSortAmountDown/> : <FaSortAmountDownAlt/>}
      </button>
   );
};

export default SortButton;