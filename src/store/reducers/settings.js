import {SETTING_SET_AI_DIFFICULTY, SETTING_SET_FIELD_SIZE, SETTING_SET_GAME_MODE} from '../actions/actionType';
import {AI_EASY, ONE_PLAYER_MODE, THREE_BY_THREE} from '../../constants';

const initialState = {
   fieldSize: THREE_BY_THREE,
   gameMode: ONE_PLAYER_MODE,
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
