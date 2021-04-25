import {GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_STATE, GAME_TOGGLE_SORT} from '../actions/actionType';

const initialState = {
   history: [{
      squares: Array(9).fill(null),
      coordinates: null,
      select: false
   }],
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
      default:
         return state;
   }
}