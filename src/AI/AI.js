import {gameSquareClick} from '../store/actions/game';
import {AI_EASY, AI_HARD, AI_MEDIUM} from '../constants';

export default class AI {
   constructor(store) {
      this.store = store;
      this.state = store.getState();
   }

   makeMove() {
      const AIMoves = this.getAvailableMoves();
      console.log('AIAvailableMoves ', AIMoves);

      if (this.isAvailableMoves(AIMoves)) {
         const AIChoice = this.getAIChoice(AIMoves);
         console.log('AIChoice index - ', AIChoice);
         console.log('AIChoice value - ', AIMoves[AIChoice]);
         this.store.dispatch(gameSquareClick(AIMoves[AIChoice]));
      } else {
         console.log('No available moves!');
      }
   }


   getAvailableMoves() {
      const result = [];
      const currentHistory = this.state.game.history[this.state.game.stepNumber];

      for (let i = 0; i < currentHistory.squares.length; i++) {
         if (currentHistory.squares[i] === null) {
            result.push(i);
         }
      }
      return result;
   }

   isAvailableMoves(moves) {
      return moves.length > 0;
   }

   getAIChoice(moves) {
      const AIDifficulty = this.getAIDifficulty();
      if (AIDifficulty === AI_EASY) return this.makeEasyChoice(moves);
      if (AIDifficulty === AI_MEDIUM) return this.makeMediumChoice(moves);
      if (AIDifficulty === AI_HARD) return this.makeHardChoice(moves);
   }

   getAIDifficulty() {
      return this.state.settings.AIDifficulty;
   }

   makeEasyChoice(moves) {
      return Math.round(Math.random() * moves.length);
   }

   makeMediumChoice(moves) {
      return 0;
   }

   makeHardChoice(moves) {
      return 0;
   }
}