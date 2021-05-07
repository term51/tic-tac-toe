import {
   AI_EASY, AI_HARD, AI_MEDIUM,
   ONE_PLAYER_MODE, ONLINE_MODE, PLAYER_VS_AI_MODE,
   THREE_BY_THREE, FIVE_BY_FIVE, FOUR_BY_FOUR
} from './constants';

export const FIELD_SIZES = [
      {
         name: '3x3',
         size: THREE_BY_THREE,
      },
      {
         name: '4x4',
         size: FOUR_BY_FOUR
      },
      {
         name: '5x5',
         size: FIVE_BY_FIVE,
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