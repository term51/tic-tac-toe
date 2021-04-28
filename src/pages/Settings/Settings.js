import React from 'react';
import classes from './Settings.module.scss';
import SettingsLayout from '../../hoc/layouts/Settings/SettingsLayout';

import {connect} from 'react-redux';
import {FIELD_SIZES, GAME_MODES} from '../../config';
import CustomRadio from '../../components/UI/CustomRadio';
import {setAIDifficulty, setFieldSize, setGameMode} from '../../store/actions/settings';
import {PLAYER_VS_AI_MODE} from '../../constants';
import AIDifficulty from './AIDifficulty';


class Settings extends React.Component {

   renderCustomRadio({name, id, value, settingName}, fn) {
      let checked;
      if (Number.isFinite(value)) {
         checked = value === this.props.gameMode;
      } else {
         checked = value === (this.props.fieldSize.rows + 'x' + this.props.fieldSize.cells);
      }

      return <CustomRadio
         key={id}
         name={name}
         id={id}
         value={value}
         settingName={settingName}
         onChange={fn}
         checked={checked}
      />;
   }

   render() {
      return (
         <SettingsLayout>
            <div className={classes.Settings}>
               <div className="input-group d-block p-4">
                  <h4 className="">Select the field size</h4>
                  {FIELD_SIZES.map((setting, index) => (
                     this.renderCustomRadio({
                           name: 'fieldSize',
                           value: setting.name,
                           id: 'fieldSize' + index,
                           settingName: setting.name
                        },
                        this.props.setFieldSize
                     )
                  ))}
               </div>
               <br/>
               <div className="input-group d-block p-4">
                  <h4 className="">Select a game mode</h4>
                  <div className="row">
                     <div className="col">
                        {GAME_MODES.map((setting, index) => (
                           this.renderCustomRadio({
                                 name: 'gameMode',
                                 value: setting.mode,
                                 id: 'gameMode' + index,
                                 settingName: setting.name
                              },
                              this.props.setGameMode
                           )
                        ))}
                     </div>
                     <div className="col">
                        {this.props.gameMode === PLAYER_VS_AI_MODE
                           ? <AIDifficulty
                              AIDifficulty={this.props.AIDifficulty}
                              onAIDifficulty={this.props.setAIDifficulty}
                           />
                           : null}
                     </div>
                  </div>
               </div>
            </div>
         </SettingsLayout>
      );
   }
}

function mapStateToProps({settings}) {
   return {
      fieldSize: {
         rows: settings.fieldSize.rows,
         cells: settings.fieldSize.cells
      },
      gameMode: settings.gameMode,
      AIDifficulty: settings.AIDifficulty
   };
}

function mapDispatchToProps(dispatch) {
   return {
      setFieldSize: (fieldSize) => dispatch(setFieldSize(fieldSize)),
      setGameMode: (gameMode) => dispatch(setGameMode(gameMode)),
      setAIDifficulty: (AIDifficulty) => dispatch(setAIDifficulty(AIDifficulty))
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);