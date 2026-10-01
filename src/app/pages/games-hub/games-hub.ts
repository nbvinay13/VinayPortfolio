import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gamesCatalog } from '../../data/games.data';

@Component({
  selector: 'app-games-hub',
  imports: [RouterLink],
  templateUrl: './games-hub.html',
  styleUrl: './games-hub.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesHub {
  protected readonly games = gamesCatalog;
}
