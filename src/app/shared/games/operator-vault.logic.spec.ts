import { describe, expect, it } from 'vitest';
import {
  createVaultSecret,
  isVaultSolved,
  scoreVaultGuess,
} from './operator-vault.logic';

describe('operator vault logic', () => {
  it('creates a 4-length unique secret', () => {
    const secret = createVaultSecret();
    expect(secret).toHaveLength(4);
    expect(new Set(secret).size).toBe(4);
  });

  it('scores exact and present clues like Mastermind', () => {
    const secret = ['map', 'filter', 'scan', 'switchMap'] as const;
    const clue = scoreVaultGuess([...secret], ['map', 'scan', 'debounceTime', 'filter']);
    expect(clue.exact).toBe(1); // map
    expect(clue.present).toBe(2); // scan + filter
  });

  it('detects a solved vault', () => {
    expect(isVaultSolved({ exact: 4, present: 0 })).toBe(true);
    expect(isVaultSolved({ exact: 3, present: 1 })).toBe(false);
  });
});
