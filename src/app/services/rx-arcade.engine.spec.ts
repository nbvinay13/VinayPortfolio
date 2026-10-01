import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { Subject, firstValueFrom } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import {
  applyKeyToState,
  pickTargetKey,
  reduceArcadeHit,
  RxArcadeEngine,
  type ArcadeState,
} from './rx-arcade.engine';

function runningState(overrides: Partial<ArcadeState> = {}): ArcadeState {
  return {
    phase: 'running',
    score: 0,
    combo: 0,
    remainingMs: 30_000,
    targetKey: 'A',
    lastResult: null,
    message: 'Go!',
    ...overrides,
  };
}

describe('RxArcade reducers', () => {
  it('pickTargetKey returns a single A-Z letter', () => {
    expect(pickTargetKey()).toMatch(/^[A-Z]$/);
  });

  it('scores a hit and advances the target', () => {
    const next = reduceArcadeHit(runningState({ targetKey: 'B' }), 'b');
    expect(next.score).toBeGreaterThan(0);
    expect(next.combo).toBe(1);
    expect(next.lastResult).toBe('hit');
    expect(next.targetKey).not.toBe('B');
  });

  it('resets combo on miss and ignores idle phase', () => {
    const miss = applyKeyToState(runningState({ combo: 4, targetKey: 'C' }), 'Z');
    expect(miss.combo).toBe(0);
    expect(miss.lastResult).toBe('miss');

    const idle = applyKeyToState(
      { ...runningState(), phase: 'idle', targetKey: 'C' },
      'C'
    );
    expect(idle.score).toBe(0);
    expect(idle.phase).toBe('idle');
  });
});

describe('RxArcadeEngine.createRound', () => {
  let engine: RxArcadeEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    engine = TestBed.inject(RxArcadeEngine);
  });

  it('emits running states with a decreasing timer', async () => {
    const keys$ = new Subject<KeyboardEvent>();
    const states = await firstValueFrom(
      engine.createRound(keys$.asObservable(), 400).pipe(take(3), toArray())
    );

    expect(states[0]?.phase).toBe('running');
    expect(states[0]?.targetKey).toMatch(/^[A-Z]$/);
    expect(states.some((s) => s.remainingMs < 400)).toBe(true);
  });

  it('start flips phase to running and stop finishes the round', () => {
    engine.start();
    let phase = '';
    const sub = engine.state$.subscribe((s) => (phase = s.phase));
    expect(phase).toBe('running');
    engine.stop();
    expect(phase).toBe('finished');
    sub.unsubscribe();
  });
});
