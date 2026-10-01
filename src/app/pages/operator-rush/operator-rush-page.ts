import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GAME_MS, RxArcadeEngine } from '../../services/rx-arcade.engine';

@Component({
  selector: 'app-operator-rush-page',
  imports: [RouterLink],
  templateUrl: './operator-rush-page.html',
  styleUrl: './operator-rush-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorRushPage {
  private readonly engine = inject(RxArcadeEngine);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly operators = [
    'fromEvent',
    'filter',
    'map',
    'scan',
    'timer',
    'takeUntil',
  ];

  protected readonly state = toSignal(this.engine.state$, {
    initialValue: this.engine.initialState(),
  });

  constructor() {
    this.engine.reset();
    this.destroyRef.onDestroy(() => this.engine.reset());
  }

  start(): void {
    this.engine.start();
  }

  stop(): void {
    this.engine.stop();
  }

  remainingSeconds(): number {
    return Math.ceil(this.state().remainingMs / 1000);
  }

  progressPercent(): number {
    return Math.max(0, Math.min(100, (this.state().remainingMs / GAME_MS) * 100));
  }
}
