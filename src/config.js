import {AI_EASY, AI_HARD, AI_MEDIUM, ONE_PLAYER_MODE, ONLINE_MODE, PLAYER_VS_AI_MODE} from './constants';

export const FIELD_SIZES = [
      {
         name: '3x3',
         rows: 3,
         cells: 3
      },
      {
         name: '4x4',
         rows: 4,
         cells: 4
      },
      {
         name: '5x5',
         rows: 5,
         cells: 5
      }
   ]
;

export const GAME_MODES = [
   {
      name: 'One player',
      mode: ONE_PLAYER_MODE
   },
   {
      name: 'Player VS AI',
      mode: PLAYER_VS_AI_MODE
   },
   {
      name: 'Player VS player (Online)',
      mode: ONLINE_MODE
   }
];

export const AI_DIFFICULTIES = [
   {
      name: 'Easy',
      difficulty: AI_EASY
   },
   {
      name: 'Medium',
      difficulty: AI_MEDIUM
   },
   {
      name: 'Hard',
      difficulty: AI_HARD
   }
];