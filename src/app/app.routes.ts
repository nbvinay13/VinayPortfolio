import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Vinay N B | Full-Stack Developer — Angular & Node.js',
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games-hub/games-hub').then((m) => m.GamesHub),
    title: 'Rx Games | Vinay N B',
  },
  {
    path: 'games/operator-rush',
    loadComponent: () =>
      import('./pages/operator-rush/operator-rush-page').then(
        (m) => m.OperatorRushPage
      ),
    title: 'Operator Rush | Rx Games',
  },
  {
    path: 'games/operator-vault',
    loadComponent: () =>
      import('./pages/operator-vault/operator-vault-page').then(
        (m) => m.OperatorVaultPage
      ),
    title: 'Operator Vault | Rx Games',
  },
  { path: '**', redirectTo: '' },
];
