import React from 'react';

const CustomRadio = props => {
   const classes = ['custom-control','custom-radio'];
   if (props.inline){
      classes.push('custom-control-inline')
   }
   return (
      <div className={classes.join(' ')}>
         <input
            disabled={props.disabled}
            type="radio"
            id={props.id}
            name={props.name}
            className="custom-control-input"
            value={props.value}
            checked={props.checked}
            onChange={() => props.onChange(props.value)}

         />
         <label className="custom-control-label" htmlFor={props.id}>{props.settingName}</label>
      </div>
   );
};
export default CustomRadio;
