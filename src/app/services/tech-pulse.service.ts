import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  combineLatest,
  interval,
  of,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  TechPulseArticle,
  TechPulseTag,
  techPulseArticles,
} from '../data/tech-pulse.data';
import { matchesQuery } from '../shared/rxjs/project-filter.util';

export type TechPulseStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface TechPulseState {
  articles: TechPulseArticle[];
  status: TechPulseStatus;
  refreshedAt: number | null;
  errorMessage: string | null;
}

export interface TechPulseSearchParams {
  query: string;
  tag: TechPulseTag | 'All';
}

@Injectable({ providedIn: 'root' })
export class TechPulseService {
  private readonly query$ = new BehaviorSubject<string>('');
  private readonly tag$ = new BehaviorSubject<TechPulseTag | 'All'>('All');
  private readonly autoRefresh$ = new BehaviorSubject<boolean>(false);
  private readonly manualRefresh$ = new Subject<void>();
  private readonly statusSubject = new BehaviorSubject<TechPulseStatus>('idle');
  private failNextFetch = false;

  readonly status$ = this.statusSubject.asObservable();

  readonly state$: Observable<TechPulseState> = combineLatest([
    this.query$.pipe(debounceTime(300), distinctUntilChanged(), startWith('')),
    this.tag$.pipe(distinctUntilChanged()),
    this.autoRefresh$.pipe(
      switchMap((enabled) =>
        enabled
          ? interval(8000).pipe(startWith(0), map(() => Date.now()))
          : of(0)
      )
    ),
    this.manualRefresh$.pipe(startWith(void 0)),
  ]).pipe(
    map(([query, tag]) => ({ query, tag }) satisfies TechPulseSearchParams),
    tap(() => this.statusSubject.next('loading')),
    switchMap((params) =>
      this.fetchArticles(params).pipe(
        map((articles) => ({
          articles,
          status: 'ready' as const,
          refreshedAt: Date.now(),
          errorMessage: null,
        })),
        catchError((err: Error) =>
          of({
            articles: [] as TechPulseArticle[],
            status: 'error' as const,
            refreshedAt: null,
            errorMessage: err.message || 'Failed to load tech pulse',
          })
        ),
        finalize(() => {
          /* status is set on emission via map/catchError */
        }),
        tap((state) => this.statusSubject.next(state.status))
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  setQuery(query: string): void {
    this.query$.next(query);
  }

  setTag(tag: TechPulseTag | 'All'): void {
    this.tag$.next(tag);
  }

  setAutoRefresh(enabled: boolean): void {
    this.autoRefresh$.next(enabled);
  }

  refresh(): void {
    this.manualRefresh$.next();
  }

  /** Test helper — next fetch throws once, then recovers. */
  simulateNextFailure(): void {
    this.failNextFetch = true;
  }

  fetchArticles(
    params: TechPulseSearchParams,
    delayMs = 280
  ): Observable<TechPulseArticle[]> {
    if (this.failNextFetch) {
      this.failNextFetch = false;
      return throwError(() => new Error('Simulated network failure'));
    }

    const filtered = techPulseArticles.filter((article) => {
      const tagOk = params.tag === 'All' || article.tag === params.tag;
      const queryOk =
        matchesQuery(article.title, params.query) ||
        matchesQuery(article.summary, params.query) ||
        matchesQuery(article.tag, params.query) ||
        matchesQuery(article.source, params.query);
      return tagOk && queryOk;
    });

    return of(filtered).pipe(
      // simulate latency without importing delay operator name clash concerns
      switchMap(
        (articles) =>
          new Observable<TechPulseArticle[]>((subscriber) => {
            const handle = setTimeout(() => {
              subscriber.next(articles);
              subscriber.complete();
            }, delayMs);
            return () => clearTimeout(handle);
          })
      )
    );
  }

  filterArticlesSync(params: TechPulseSearchParams): TechPulseArticle[] {
    return techPulseArticles.filter((article) => {
      const tagOk = params.tag === 'All' || article.tag === params.tag;
      const queryOk =
        matchesQuery(article.title, params.query) ||
        matchesQuery(article.summary, params.query) ||
        matchesQuery(article.tag, params.query) ||
        matchesQuery(article.source, params.query);
      return tagOk && queryOk;
    });
  }
}
