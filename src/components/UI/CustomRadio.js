import React from 'react';

const CustomRadio = props => {
   return (
      <div className="custom-control custom-radio">
         <input
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
