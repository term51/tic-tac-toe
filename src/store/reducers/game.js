import {
   GAME_JUMP_TO,
   GAME_SAVE_HISTORY,
   GAME_SET_PLAYER_SIDE,
   GAME_SET_STATE,
   GAME_TOGGLE_SORT
} from '../actions/actionType';
import {FIELD_SIZES} from '../../config';
import {FIRST_PLAYER} from '../../constants';

const fieldLength = FIELD_SIZES[0].size;

const initialState = {
   history: [{
      // squares: Array(9).fill(null),
      squares: Array(fieldLength).fill(Array(fieldLength).fill(null)),
      coordinates: null,
      select: false
   }],
   playerSide: FIRST_PLAYER,
   xIsNext: true,
   stepNumber: 0,
   isReverseSort: false
};

export default function gameReducer(state = initialState, action) {
   switch (action.type) {
      case GAME_SET_STATE:
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
         // return {...state,playerSide: action.playerSide, xIsNext: !state.xIsNext};
         return {...state,playerSide: action.playerSide};
      default:
         return state;
   }
}