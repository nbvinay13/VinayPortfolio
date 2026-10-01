import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  merge,
  timer,
  fromEvent,
  EMPTY,
} from 'rxjs';
import { filter, map, scan, takeUntil, takeWhile } from 'rxjs/operators';

export type ArcadePhase = 'idle' | 'running' | 'finished';

export interface ArcadeState {
  phase: ArcadePhase;
  score: number;
  combo: number;
  remainingMs: number;
  targetKey: string;
  lastResult: 'hit' | 'miss' | null;
  message: string;
}

export const GAME_MS = 30_000;
const KEYS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

export function pickTargetKey(exclude?: string): string {
  let key = KEYS[Math.floor(Math.random() * KEYS.length)]!;
  if (exclude && KEYS.length > 1) {
    let guard = 0;
    while (key === exclude && guard < 10) {
      key = KEYS[Math.floor(Math.random() * KEYS.length)]!;
      guard += 1;
    }
  }
  return key;
}

export function reduceArcadeHit(state: ArcadeState, key: string): ArcadeState {
  if (state.phase !== 'running') {
    return state;
  }
  if (key.toUpperCase() === state.targetKey) {
    const combo = state.combo + 1;
    return {
      ...state,
      score: state.score + 1 + Math.floor(combo / 3),
      combo,
      targetKey: pickTargetKey(state.targetKey),
      lastResult: 'hit',
      message: combo > 2 ? `Combo x${combo}` : 'Hit!',
    };
  }
  return {
    ...state,
    combo: 0,
    lastResult: 'miss',
    message: 'Miss — keep going',
  };
}

export function applyKeyToState(state: ArcadeState, key: string): ArcadeState {
  return reduceArcadeHit(state, key);
}

type RoundEvent =
  | { type: 'tick'; remainingMs: number }
  | { type: 'key'; key: string };

@Injectable({ providedIn: 'root' })
export class RxArcadeEngine {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly stateSubject = new BehaviorSubject<ArcadeState>(this.initialState());
  private readonly abort$ = new Subject<void>();
  private roundSub: Subscription | null = null;

  readonly state$: Observable<ArcadeState> = this.stateSubject.asObservable();

  start(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.abortActiveRound();
    this.roundSub = this.createRound().subscribe({
      next: (state) => this.stateSubject.next(state),
      complete: () => {
        const current = this.stateSubject.value;
        if (current.phase === 'running') {
          this.stateSubject.next({
            ...current,
            phase: 'finished',
            remainingMs: Math.min(current.remainingMs, 0),
            message: `Done — score ${current.score}`,
          });
        }
      },
    });
  }

  stop(): void {
    const current = this.stateSubject.value;
    this.abortActiveRound();
    if (current.phase === 'running') {
      this.stateSubject.next({
        ...current,
        phase: 'finished',
        message: `Stopped — score ${current.score}`,
      });
    }
  }

  reset(): void {
    this.abortActiveRound();
    this.stateSubject.next(this.initialState());
  }

  initialState(): ArcadeState {
    return {
      phase: 'idle',
      score: 0,
      combo: 0,
      remainingMs: GAME_MS,
      targetKey: '?',
      lastResult: null,
      message: 'Press Start — match the glowing key',
    };
  }

  createRound(
    keydown$: Observable<KeyboardEvent> | undefined = undefined,
    durationMs = GAME_MS
  ): Observable<ArcadeState> {
    if (!isPlatformBrowser(this.platformId) && !keydown$) {
      return EMPTY;
    }

    const keySource$ =
      keydown$ ?? fromEvent<KeyboardEvent>(document, 'keydown');

    const ends$ = merge(timer(durationMs + 50), this.abort$);

    const tick$ = timer(0, 100).pipe(
      map((i) => durationMs - i * 100),
      takeWhile((ms) => ms >= 0),
      map((remainingMs) => ({ type: 'tick' as const, remainingMs })),
      takeUntil(ends$)
    );

    const hits$ = keySource$.pipe(
      filter((e) => {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)
        ) {
          return false;
        }
        return e.key.length === 1 && /[a-z]/i.test(e.key);
      }),
      map((e) => ({ type: 'key' as const, key: e.key.toUpperCase() })),
      takeUntil(ends$)
    );

    const seed: ArcadeState = {
      phase: 'running',
      score: 0,
      combo: 0,
      remainingMs: durationMs,
      targetKey: pickTargetKey(),
      lastResult: null,
      message: 'Go! Type the letter shown',
    };

    this.stateSubject.next(seed);

    return merge(tick$, hits$).pipe(
      scan((state: ArcadeState, event: RoundEvent): ArcadeState => {
        if (event.type === 'tick') {
          if (event.remainingMs <= 0) {
            return {
              ...state,
              remainingMs: 0,
              phase: 'finished',
              message: `Done — score ${state.score}`,
            };
          }
          return { ...state, remainingMs: event.remainingMs };
        }
        return reduceArcadeHit(state, event.key);
      }, seed),
      takeUntil(ends$)
    );
  }

  private abortActiveRound(): void {
    this.abort$.next();
    this.roundSub?.unsubscribe();
    this.roundSub = null;
  }
}
