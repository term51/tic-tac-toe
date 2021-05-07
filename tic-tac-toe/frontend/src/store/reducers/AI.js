import {
   AI_ADD_WAY_TO_LIST, AI_CLEAR_WAY_LIST,
   AI_SET_AI_PLAYER_UNITS,
   AI_SET_AVAILABLE_MOVES,
   AI_SET_CURRENT_INDEX,
   AI_SET_ENEMY,
   AI_SET_PLAYER_UNITS
} from '../actions/actionType';
import {FIRST_PLAYER, SECOND_PLAYER} from '../../constants';

const initialState = {
   currentIndex: null,
   Player: FIRST_PLAYER,
   AIPlayer: SECOND_PLAYER,
   enemy: '',
   AIPlayerUnits: [],
   PlayerUnits: [],
   availableMoves: [],
   wayList: []

};

export default function AIReducer(state = initialState, action) {
   switch (action.type) {
      case AI_SET_AI_PLAYER_UNITS:
         return {...state, AIPlayerUnits: action.playerUnits};
      case AI_SET_PLAYER_UNITS:
         return {...state, PlayerUnits: action.playerUnits};
      case AI_SET_AVAILABLE_MOVES:
         return {...state, availableMoves: action.availableMoves};
      case AI_SET_ENEMY:
         return {...state, enemy: action.enemy};
      case AI_SET_CURRENT_INDEX:
         return {...state, currentIndex: action.currentIndex};
      case AI_ADD_WAY_TO_LIST:
         return {...state, wayList: [...state.wayList, action.way]};
      case AI_CLEAR_WAY_LIST:
         return {...state, wayList: []};
      default:
         return state;
   }
}