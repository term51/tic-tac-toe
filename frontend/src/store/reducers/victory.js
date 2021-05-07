import {VICTORY_SET_LIST_OF_WINNING_LINES} from '../actions/actionType';

const initialState = {
   listOfWinningLines: [],
};

export default function victoryReducer(state = initialState, action) {
   switch (action.type) {
      case VICTORY_SET_LIST_OF_WINNING_LINES:
         return {...state, listOfWinningLines: action.listOfWinningLines};
      default:
         return state;
   }
}