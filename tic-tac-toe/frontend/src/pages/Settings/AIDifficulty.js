import React from 'react';
import ButtonGroup from '../../components/UI/ButtonGroup';
import {AI_DIFFICULTIES} from '../../config';

const AIDifficulty = props => {
   return (
      <div>
         <h6>Select the difficulty of the AI</h6>
         <ButtonGroup
            AIDifficulty={props.AIDifficulty}
            buttons={AI_DIFFICULTIES}
            onAIDifficulty={props.onAIDifficulty}
         />
      </div>
   );
};

export default AIDifficulty;