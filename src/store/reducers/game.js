import {
   GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_PLAYER_SIDE, GAME_MAKE_MOVE, GAME_TOGGLE_SORT
} from '../actions/actionType';
import {FIRST_PLAYER, THREE_BY_THREE} from '../../constants';

const initialState = {
   history: [{
      squares: Array(THREE_BY_THREE).fill(Array(THREE_BY_THREE).fill(null)),
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
      default:
         return state;
   }
}