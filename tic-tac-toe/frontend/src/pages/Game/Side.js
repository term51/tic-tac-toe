import React from 'react';
import CustomRadio from '../../components/UI/CustomRadio';
import {FIRST_PLAYER, SECOND_PLAYER} from '../../constants';

const Side = props => {
   function renderCustomRadio({name, id, value, settingName}) {
      let checked = value === props.playerSide;

      return <CustomRadio
         key={id}
         disabled={props.disabled}
         name={name}
         id={id}
         value={value}
         settingName={settingName}
         onChange={props.onChangePlayerSide}
         checked={checked}
         inline={true}
      />;
   }


   return (
      <React.Fragment>
         <h6>Choose a side.</h6>
         {renderCustomRadio({
            name: 'customRadioInline',
            value: FIRST_PLAYER,
            id: 'customRadioInline1',
            settingName: FIRST_PLAYER
         })}
         {renderCustomRadio({
            name: 'customRadioInline',
            value: SECOND_PLAYER,
            id: 'customRadioInline2',
            settingName: SECOND_PLAYER
         })}
      </React.Fragment>
   );
};

export default Side;