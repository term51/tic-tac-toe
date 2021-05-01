import {FIELD_SIZES, GAME_MODES} from '../../config';
import {SETTING_SET_AI_DIFFICULTY, SETTING_SET_FIELD_SIZE, SETTING_SET_GAME_MODE} from '../actions/actionType';
import {AI_EASY} from '../../constants';

const initialState = {
   fieldSize: FIELD_SIZES[0].size,
   gameMode: GAME_MODES[0].mode,
   AIDifficulty: AI_EASY
};

export default function settingsReducer(state = initialState, action) {
   switch (action.type) {
      case SETTING_SET_FIELD_SIZE:
         return {...state, fieldSize: action.fieldSize};
      case SETTING_SET_GAME_MODE:
         return {...state, gameMode: action.gameMode};
      case SETTING_SET_AI_DIFFICULTY:
         return {...state, AIDifficulty: action.AIDifficulty};
      default:
         return state;
   }
}
