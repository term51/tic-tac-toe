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
      this.Player = 'X';
      this.enemy = null;

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
      this.AIPlayerUnits = this.getPlayerMoves(this.AIPlayer);
      this.PlayerUnits = this.getPlayerMoves(this.Player);

      this.wayList = [];

   }

   getPlayerMoves(player) {
      const result = [];
      this.field.forEach((row, rowIndex) => {
         row.forEach((cell, cellIndex) => {
            if (cell === player) {
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
      return this._makeRandomMove(moves);
   }

   _makeMediumChoice(moves) {
      // если AI ходит первый раз
      if (this.AIPlayerUnits.length === 0) {
         const center = this._getCenterCoordinates();
         // если центр не занят - занять
         if (this.field[center][center] === null) {
            return moves.indexOf(`${center}:${center}`);
         }
         // если центр занят сделать рандомный ход
         return this._makeRandomMove(moves);
      }

      this.AIPlayerUnits.forEach(({coordinates}, index) => {
         this.enemy = 'X';
         this.currentIndex = index;
         const splitCoordinate = coordinates.split(':');
         this._getHorizontalWay(splitCoordinate[0]);
         this._getVerticalWay(splitCoordinate[1]);
         this._getFirstDiagonalWay(coordinates);
         this._getSecondDiagonalWay(coordinates);
      });

      this._calculateWaypoints(this.AIPlayerUnits);

      const possibleMoves = this._getWayWithMaximumPoints();

      for (let i = 0; i < possibleMoves.length; i++) {
         if (moves.includes(possibleMoves[i])) return moves.indexOf(possibleMoves[i]);
      }

      return this._makeRandomMove(moves);
   }

   _makeHardChoice(moves) {
      console.log('hard', moves);
      // если AI ходит первый раз
      if (this.AIPlayerUnits.length === 0) {
         const center = this._getCenterCoordinates();
         // если центр не занят - занять
         if (this.field[center][center] === null) {
            return moves.indexOf(`${center}:${center}`);
         }
         // если центр занят сделать рандомный ход
         return this._makeRandomMove(moves);
      }

      this.AIPlayerUnits.forEach(({coordinates}, index) => {
         this.enemy = 'X';
         this.currentIndex = index;
         const splitCoordinate = coordinates.split(':');
         this._getHorizontalWay(splitCoordinate[0]);
         this._getVerticalWay(splitCoordinate[1]);
         this._getFirstDiagonalWay(coordinates);
         this._getSecondDiagonalWay(coordinates);
      });

      this.PlayerUnits.forEach(({coordinates}, index) => {
         this.enemy = 'O';
         this.currentIndex = index;
         const splitCoordinate = coordinates.split(':');
         this._getHorizontalWay(splitCoordinate[0]);
         this._getVerticalWay(splitCoordinate[1]);
         this._getFirstDiagonalWay(coordinates);
         this._getSecondDiagonalWay(coordinates);
      });

      this._calculateWaypoints(this.AIPlayerUnits);
      this._calculateWaypoints(this.PlayerUnits);

      const possibleMoves = this._getWayWithMaximumPoints();

      for (let i = 0; i < possibleMoves.length; i++) {
         if (moves.includes(possibleMoves[i])) return moves.indexOf(possibleMoves[i]);
      }

      return this._makeRandomMove(moves);
   }

   _makeRandomMove(moves) {
      return Math.floor(Math.random() * moves.length);
   }

   _getCenterCoordinates() {
      return Math.floor(this.state.settings.fieldSize / 2);
   }

   _getHorizontalWay(coordinates) {
      const way = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(coordinates, i)) return;
         way.push(`${coordinates}:${i}`);
      }
      this._addWay(way);
   }

   _getVerticalWay(coordinates) {
      const way = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, coordinates)) return;
         way.push(`${i}:${coordinates}`);
      }
      this._addWay(way);
   }

   _getFirstDiagonalWay(coordinates) {
      const firstDiagonal = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, i)) return;
         firstDiagonal.push(`${i}:${i}`);
      }
      if (this._isWayIncludeTheCoordinates(firstDiagonal, coordinates)) {
         this._addWay(firstDiagonal);
      }
   }

   _getSecondDiagonalWay(coordinates) {
      const secondDiagonal = [];
      for (let i = 0; i < 3; i++) {
         if (this._isEnemy(i, 2 - i)) return;
         secondDiagonal.push(`${i}:${2 - i}`);
      }

      if (this._isWayIncludeTheCoordinates(secondDiagonal, coordinates)) {
         this._addWay(secondDiagonal);
      }
   }

   _isWayIncludeTheCoordinates(way, coordinates) {
      return way.includes(coordinates);
   }

   _isEnemy(row, cell) {
      return this.field[row][cell] === this.enemy;
   }

   _addWay(way) {
      // TODO: переделать
      if (this.enemy === 'X') {
         this.AIPlayerUnits[this.currentIndex].ways.push({
            points: 0,
            way
         });
      } else {
         this.PlayerUnits[this.currentIndex].ways.push({
            points: 0,
            way
         });
      }

   }

   _calculateWaypoints(player) {
      player.forEach(unit => {
         unit.ways.forEach(way => {
            way.way.forEach(coordinates => {
               const splitCoordinates = coordinates.split(':');
               const fieldContent = this.field[parseInt(splitCoordinates[0])][parseInt(splitCoordinates[1])];
               if (fieldContent === null) {
                  way.points += 1;
               } else {
                  way.points += 2;
               }
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


}