import React from 'react';
import CustomRadio from '../../components/UI/CustomRadio';

const Side = props => {
   console.log('size', props);

   function renderCustomRadio({name, id, value, settingName}) {
      let checked = value === props.playerSide;

      return <CustomRadio
         key={id}
         disabled={props.disabled}
         name={name}
         id={id}
         value={value}
         settingName={settingName}
         onChange={props.onSetPlayerSide}
         checked={checked}
         inline={true}
      />;
   }


   return (
      <React.Fragment>
         <h6>Choose a side.</h6>
         {renderCustomRadio({
            name: 'customRadioInline',
            value: 'X',
            id: 'customRadioInline1',
            settingName: 'X'
         })}
         {renderCustomRadio({
            name: 'customRadioInline',
            value: 'O',
            id: 'customRadioInline2',
            settingName: 'O'
         })}
      </React.Fragment>
   );
};

export default Side;