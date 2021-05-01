import {gameSquareClick} from '../store/actions/game';
import {AI_EASY, AI_HARD, AI_MEDIUM} from '../constants';

export default class AI {
   constructor(store) {
      this.store = store;
      this.state = store.getState();
      this.currentIndex = null;

      // this.field = [
      //    ['X', null, null],
      //    ['O', null, 'O'],
      //    ['X', 'X', null]
      // ];

      const currentHistory = this.state.game.history[this.state.game.stepNumber];
      this.field = currentHistory.squares;

      // стейт

      this.AIPlayer = 'O';
      this.enemy = 'X';

      // this.AIPlayerUnits = [
      // {
      //    coordinates: '1:0',
      //    ways: []
      // },
      // {
      //    coordinates: '1:2',
      //    ways: []
      // }
      // ];
      this.AIPlayerUnits = this.getAIMoves();

      this.wayList = [];

   }

   getAIMoves() {
      const result = [];
      this.field.forEach((row, rowIndex) => {
         row.forEach((cell, cellIndex) => {
            if (cell === this.AIPlayer) {
               result.push({
                  coordinates: rowIndex + ':' + cellIndex,
                  ways: []
               });
            }
         });
      });
      return result;
   }

   makeMove() {
      const AIMoves = this.getAvailableMoves();
      console.log('AIAvailableMoves ', AIMoves);

      if (this.isAvailableMoves(AIMoves)) {
         const AIChoice = this._AIMakeChoice(AIMoves);
         // console.log('AIChoice index - ', AIChoice);
         // console.log('AIChoice value - ', AIMoves[AIChoice]);
         this.store.dispatch(gameSquareClick(AIMoves[AIChoice]));
      } else {
         console.log('No available moves!');
      }
   }


   getAvailableMoves() {
      const result = [];
      const currentHistory = this.state.game.history[this.state.game.stepNumber];


      currentHistory.squares.forEach((row, rowIndex) => {
         row.forEach((cell, cellIndex) => {
            if (this.field[rowIndex][cellIndex] === null) {
               result.push(`${rowIndex}:${cellIndex}`);
            }
         });
      });

      // for (let i = 0; i < currentHistory.squares.length; i++) {
      //    if (currentHistory.squares[i] === null) {
      //       result.push(i);
      //    }
      // }
      return result;
   }

   isAvailableMoves(moves) {
      return moves.length > 0;
   }

   _AIMakeChoice(moves) {
      const AIDifficulty = this.getAIDifficulty();
      if (AIDifficulty === AI_EASY) return this._makeEasyChoice(moves);
      if (AIDifficulty === AI_MEDIUM) return this._makeMediumChoice(moves);
      if (AIDifficulty === AI_HARD) return this._makeHardChoice(moves);
   }

   getAIDifficulty() {
      return this.state.settings.AIDifficulty;
   }

   _makeEasyChoice(moves) {

      return this._makeMediumChoice(moves);
      // return Math.floor(Math.random() * moves.length);
   }

   _makeMediumChoice(moves) {

      if (this.AIPlayerUnits.length === 0) {
         return Math.floor(Math.random() * moves.length);
      }

      this.AIPlayerUnits.forEach(({coordinates}, index) => {
         this.currentIndex = index;
         const splitCoordinate = coordinates.split(':');
         this._getHorizontalWay(splitCoordinate[0]);
         this._getVerticalWay(splitCoordinate[1]);
         this._getFirstDiagonalWay();
         this._getSecondDiagonalWay();
      });

      this._calculateWaypoints();
      console.log(this.AIPlayerUnits);

      const possibleMoves = this._getWayWithMaximumPoints();

      for (let i = 0; i < possibleMoves.length; i++) {
         if (moves.includes(possibleMoves[i])) return moves.indexOf(possibleMoves[i]);
      }

      return Math.floor(Math.random() * moves.length);
   }


   _getHorizontalWay(coordinate) {
      const way = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(coordinate, i)) return;
         way.push(`${coordinate}:${i}`);
      }
      this._addWay(way);
   }

   _getVerticalWay(coordinate) {
      const way = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, coordinate)) return;
         way.push(`${i}:${coordinate}`);
      }
      this._addWay(way);
   }

   _getFirstDiagonalWay() {
      const firstDiagonal = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, i)) return;
         firstDiagonal.push(`${i}:${i}`);
      }
      if (this._isWayIncludeTheCoordinates(firstDiagonal)) {
         this._addWay(firstDiagonal);
      }
   }

   _getSecondDiagonalWay() {
      const secondDiagonal = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, 2 - i)) return;
         secondDiagonal.push(`${i}:${2 - i}`);
      }

      if (this._isWayIncludeTheCoordinates(secondDiagonal)) {
         this._addWay(secondDiagonal);
      }
   }

   _isWayIncludeTheCoordinates(way) {
      return way.includes('1:1');
   }

   _isEnemy(row, cell) {
      return this.field[row][cell] === this.enemy;
   }

   _addWay(way) {
      this.AIPlayerUnits[this.currentIndex].ways.push({
         points: 0,
         way
      });
      console.log('AIPlayerUnits', this.AIPlayerUnits);
   }

   _calculateWaypoints() {
      this.AIPlayerUnits.forEach(unit => {
         unit.ways.forEach(way => {
            way.way.forEach(coordinates => {
               const splitCoordinates = coordinates.split(':');
               const fieldContent = this.field[parseInt(splitCoordinates[0])][parseInt(splitCoordinates[1])];

               if (fieldContent === null) way.points += 1;
               if (fieldContent === this.AIPlayer) way.points += 2;
            });
            this.wayList.push(way);
         });
      });
   }

   _getWayWithMaximumPoints() {
      const bestChoice = {
         points: 0,
         way: []
      };
      this.wayList.forEach(item => {
         if (item.points > bestChoice.points) {
            bestChoice.points = item.points;
            bestChoice.way = item.way;
         }
      });
      return bestChoice.way;
   }


   _makeHardChoice(moves) {
      console.log('hard ', moves);
      return 0;
   }
}