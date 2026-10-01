export type VaultOperator =
  | 'map'
  | 'filter'
  | 'switchMap'
  | 'mergeMap'
  | 'debounceTime'
  | 'scan'
  | 'distinctUntilChanged'
  | 'catchError';

export interface VaultClue {
  exact: number;
  present: number;
}

export interface VaultGuess {
  attempt: VaultOperator[];
  clue: VaultClue;
}

export const VAULT_LENGTH = 4;
export const VAULT_MAX_ATTEMPTS = 8;

export const vaultOperatorPool: VaultOperator[] = [
  'map',
  'filter',
  'switchMap',
  'mergeMap',
  'debounceTime',
  'scan',
  'distinctUntilChanged',
  'catchError',
];

/** Pick a secret pipeline without repeating operators. */
export function createVaultSecret(
  pool: VaultOperator[] = vaultOperatorPool,
  length = VAULT_LENGTH,
  random: () => number = Math.random
): VaultOperator[] {
  const copy = [...pool];
  const secret: VaultOperator[] = [];
  while (secret.length < length && copy.length) {
    const idx = Math.floor(random() * copy.length);
    secret.push(copy.splice(idx, 1)[0]!);
  }
  return secret;
}

/**
 * Mastermind-style clue:
 * exact = right operator in right slot
 * present = right operator in wrong slot (excluding exact matches)
 */
export function scoreVaultGuess(
  secret: VaultOperator[],
  guess: VaultOperator[]
): VaultClue {
  const exactFlags = secret.map((op, i) => op === guess[i]);
  const exact = exactFlags.filter(Boolean).length;

  const secretRemain: VaultOperator[] = [];
  const guessRemain: VaultOperator[] = [];
  secret.forEach((op, i) => {
    if (!exactFlags[i]) {
      secretRemain.push(op);
      guessRemain.push(guess[i]!);
    }
  });

  let present = 0;
  for (const g of guessRemain) {
    const idx = secretRemain.indexOf(g);
    if (idx >= 0) {
      present += 1;
      secretRemain.splice(idx, 1);
    }
  }

  return { exact, present };
}

export function isVaultSolved(clue: VaultClue, length = VAULT_LENGTH): boolean {
  return clue.exact === length;
}
