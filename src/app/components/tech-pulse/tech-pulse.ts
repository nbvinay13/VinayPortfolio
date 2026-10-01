import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { techPulseTags } from '../../data/tech-pulse.data';
import {
  TechPulseService,
  TechPulseState,
} from '../../services/tech-pulse.service';
import type { TechPulseTag } from '../../data/tech-pulse.data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tech-pulse',
  imports: [FormsModule, DatePipe],
  templateUrl: './tech-pulse.html',
  styleUrl: './tech-pulse.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechPulse {
  private readonly techPulse = inject(TechPulseService);

  protected readonly tags = techPulseTags;
  protected readonly operators = [
    'combineLatest',
    'debounceTime',
    'distinctUntilChanged',
    'switchMap',
    'catchError',
    'shareReplay',
    'interval',
  ];

  protected readonly query = signal('');
  protected readonly activeTag = signal<TechPulseTag | 'All'>('All');
  protected readonly autoRefresh = signal(false);

  protected readonly state = toSignal(this.techPulse.state$, {
    initialValue: {
      articles: [],
      status: 'idle',
      refreshedAt: null,
      errorMessage: null,
    } satisfies TechPulseState,
  });

  protected readonly statusLabel = toSignal(
    this.techPulse.status$.pipe(
      map((status) => {
        switch (status) {
          case 'loading':
            return 'loading…';
          case 'error':
            return 'error — stream recovered via catchError';
          case 'ready':
            return 'ready';
          default:
            return 'idle';
        }
      })
    ),
    { initialValue: 'idle' }
  );

  onQueryChange(value: string): void {
    this.query.set(value);
    this.techPulse.setQuery(value);
  }

  onTagChange(tag: TechPulseTag | 'All'): void {
    this.activeTag.set(tag);
    this.techPulse.setTag(tag);
  }

  toggleAutoRefresh(): void {
    const next = !this.autoRefresh();
    this.autoRefresh.set(next);
    this.techPulse.setAutoRefresh(next);
  }

  refresh(): void {
    this.techPulse.refresh();
  }

  simulateError(): void {
    this.techPulse.simulateNextFailure();
    this.techPulse.refresh();
  }
}
