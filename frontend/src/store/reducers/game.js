import {
   GAME_JUMP_TO,
   GAME_SAVE_HISTORY,
   GAME_SET_PLAYER_SIDE,
   GAME_MAKE_MOVE,
   GAME_TOGGLE_SORT,
   GAME_RESET_STATE,
   GAME_APP_IS_CONFIGURED
} from '../actions/actionType';
import {FIRST_PLAYER} from '../../constants';

const initialState = {
   history: [{
      squares: [],
      coordinates: null,
      select: false
   }],
   playerSide: FIRST_PLAYER,
   xIsNext: true,
   stepNumber: 0,
   isReverseSort: false,
   isAppConfigured: false
};

export default function gameReducer(state = initialState, action) {
   switch (action.type) {
      case GAME_APP_IS_CONFIGURED:
         return {...state, isAppConfigured: true};
      case GAME_MAKE_MOVE:
         return {
            ...state,
            history: action.history,
            stepNumber: action.history.length - 1,
            xIsNext: !state.xIsNext
         };
      case GAME_TOGGLE_SORT:
         return {...state, isReverseSort: !state.isReverseSort};
      case GAME_JUMP_TO:
         return {...state, stepNumber: action.step, xIsNext: (action.step % 2) === 0};
      case GAME_SAVE_HISTORY:
         return {...state, history: action.history};
      case GAME_SET_PLAYER_SIDE:
         return {...state, playerSide: action.playerSide};
      case GAME_RESET_STATE:
         return {...state, history: action.history, playerSide: FIRST_PLAYER, stepNumber: 0, xIsNext: true};
      default:
         return state;
   }
}