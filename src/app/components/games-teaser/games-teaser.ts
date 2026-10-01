import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gamesCatalog } from '../../data/games.data';

@Component({
  selector: 'app-games-teaser',
  imports: [RouterLink],
  templateUrl: './games-teaser.html',
  styleUrl: './games-teaser.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesTeaser {
  protected readonly games = gamesCatalog;
}
