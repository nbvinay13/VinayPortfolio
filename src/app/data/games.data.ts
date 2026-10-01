export type GameId = 'operator-rush' | 'operator-vault';

export interface GameCard {
  id: GameId;
  name: string;
  tagline: string;
  difficulty: 'Arcade' | 'Puzzle';
  operators: string[];
  route: string;
  accent: string;
}

export const gamesCatalog: GameCard[] = [
  {
    id: 'operator-rush',
    name: 'Operator Rush',
    tagline:
      '30-second keyboard blitz. Match glowing letters while RxJS scores hits with scan and fromEvent.',
    difficulty: 'Arcade',
    operators: ['fromEvent', 'filter', 'scan', 'timer', 'takeUntil'],
    route: '/games/operator-rush',
    accent: '#0d8a78',
  },
  {
    id: 'operator-vault',
    name: 'Operator Vault',
    tagline:
      'Crack a secret 4-operator pipeline. Each guess returns position clues — a Mastermind-style RxJS puzzle.',
    difficulty: 'Puzzle',
    operators: ['map', 'filter', 'switchMap', 'debounceTime', 'mergeMap', 'scan'],
    route: '/games/operator-vault',
    accent: '#3d7ea6',
  },
];
