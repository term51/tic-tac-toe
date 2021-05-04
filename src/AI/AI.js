import {gameSquareClick} from '../store/actions/game';
import {AI_EASY, AI_HARD, AI_MEDIUM, FIRST_PLAYER, SECOND_PLAYER} from '../constants';

export default class AI {
   constructor(store) {
      this.store = store;
      this.state = store.getState();
      this.currentIndex = null;

      const currentHistory = this.state.game.history[this.state.game.stepNumber];
      this.field = currentHistory.squares;

      this.AIPlayer = this.state.game.playerSide === SECOND_PLAYER ? FIRST_PLAYER : SECOND_PLAYER;
      this.Player = this.state.game.playerSide;
      this.enemy = null;

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

      return result;
   }

   isAvailableMoves(moves) {
      return moves.length > 0;
   }

   _AIMakeChoice(moves) {
      const AIDifficulty = this.getAIDifficulty();
      if (AIDifficulty === AI_EASY) return this._makeEasyChoice(moves);
      if (this._isFirstTimeChoice()) return this._makeMoveInCenter(moves);
      if (AIDifficulty === AI_MEDIUM) return this._makeMediumChoice(moves);
      if (AIDifficulty === AI_HARD) return this._makeHardChoice(moves);
   }

   getAIDifficulty() {
      return this.state.settings.AIDifficulty;
   }

   _isFirstTimeChoice() {
      return this.AIPlayerUnits.length === 0;
   }

   _makeMoveInCenter(moves) {
      const center = this._getCenterCoordinates();
      // если центр не занят - занять
      if (this.field[center][center] === null) {
         return moves.indexOf(`${center}:${center}`);
      }
      // если центр занят сделать рандомный ход
      return this._makeRandomMove(moves);
   }

   _makeEasyChoice(moves) {
      return this._makeRandomMove(moves);
   }

   _makeMediumChoice(moves) {
      this._getAllWays(this.AIPlayerUnits, this.Player);
      this._calculateWaypoints(this.AIPlayerUnits);
      const possibleMoves = this._getWayWithMaximumPoints();

      for (let i = 0; i < possibleMoves.length; i++) {
         if (moves.includes(possibleMoves[i])) return moves.indexOf(possibleMoves[i]);
      }
      return this._makeRandomMove(moves);
   }


   _makeHardChoice(moves) {
      // если AI ходит первый раз
      if (this._isFirstTimeChoice()) {
         this._makeMoveInCenter(moves);
      }
      // TODO оптимизировать при переносе в redux
      this._getAllWays(this.AIPlayerUnits, this.Player);
      this._getAllWays(this.PlayerUnits, this.AIPlayer);

      this._calculateWaypoints(this.AIPlayerUnits);
      this._calculateWaypoints(this.PlayerUnits);
      // console.log('AIPlayerUnits', this.AIPlayerUnits);
      // console.log('PlayerUnits', this.PlayerUnits);
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

   _getAllWays(playerUnits, playerMark) {
      playerUnits.forEach(({coordinates}, index) => {
         this.enemy = playerMark;
         this.currentIndex = index;
         const splitCoordinate = coordinates.split(':');
         this._getHorizontalWay(splitCoordinate[0]);
         this._getVerticalWay(splitCoordinate[1]);
         this._getFirstDiagonalWay(coordinates);
         this._getSecondDiagonalWay(coordinates);
      });
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
      if (this.enemy !== this.AIPlayer) {
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