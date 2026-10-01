import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { architectureHighlights } from '../../data/portfolio.data';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.html',
  styleUrl: './architecture.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Architecture {
  protected readonly highlights = architectureHighlights;
  protected readonly active = signal(0);

  select(index: number): void {
    this.active.set(index);
  }
}
