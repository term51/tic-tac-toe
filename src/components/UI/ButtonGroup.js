import React from 'react';

const ButtonGroup = props => {
   return (
      <div className="btn-group" role="group" aria-label="Basic example">
         {
            props.buttons.map((button, index) => (
               <button
                  key={index}
                  type="button"
                  className={`btn btn-secondary ${button.difficulty === props.AIDifficulty ? 'active' : ''}`}
                  onClick={() => props.onAIDifficulty(button.difficulty)}
               >{button.name}
               </button>
            ))
         }
      </div>
   );
};
export default ButtonGroup;
