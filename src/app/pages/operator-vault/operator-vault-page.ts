import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  VAULT_LENGTH,
  VAULT_MAX_ATTEMPTS,
  VaultGuess,
  VaultOperator,
  createVaultSecret,
  isVaultSolved,
  scoreVaultGuess,
  vaultOperatorPool,
} from '../../shared/games/operator-vault.logic';

@Component({
  selector: 'app-operator-vault-page',
  imports: [RouterLink],
  templateUrl: './operator-vault-page.html',
  styleUrl: './operator-vault-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorVaultPage {
  protected readonly pool = vaultOperatorPool;
  protected readonly maxAttempts = VAULT_MAX_ATTEMPTS;
  protected readonly length = VAULT_LENGTH;
  protected readonly operators = [
    'scan',
    'map',
    'filter',
    'pure functions',
  ];

  private readonly secret = signal(createVaultSecret());
  protected readonly draft = signal<(VaultOperator | null)[]>(
    Array.from({ length: VAULT_LENGTH }, () => null)
  );
  protected readonly guesses = signal<VaultGuess[]>([]);
  protected readonly status = signal<'playing' | 'won' | 'lost'>('playing');
  protected readonly message = signal('Fill 4 slots, then Submit guess.');

  protected readonly attemptsLeft = computed(
    () => this.maxAttempts - this.guesses().length
  );

  protected readonly draftFull = computed(() =>
    this.draft().every((slot) => slot !== null)
  );

  selectOperator(op: VaultOperator): void {
    if (this.status() !== 'playing') {
      return;
    }
    const next = [...this.draft()];
    const emptyIdx = next.findIndex((slot) => slot === null);
    if (emptyIdx === -1) {
      return;
    }
    // no duplicates in a single guess
    if (next.includes(op)) {
      this.message.set('Each operator can appear once per guess.');
      return;
    }
    next[emptyIdx] = op;
    this.draft.set(next);
    this.message.set('Keep filling the pipeline — or submit when ready.');
  }

  clearSlot(index: number): void {
    if (this.status() !== 'playing') {
      return;
    }
    const next = [...this.draft()];
    next[index] = null;
    this.draft.set(next);
  }

  clearDraft(): void {
    this.draft.set(Array.from({ length: VAULT_LENGTH }, () => null));
  }

  submitGuess(): void {
    if (this.status() !== 'playing' || !this.draftFull()) {
      return;
    }
    const attempt = this.draft() as VaultOperator[];
    const clue = scoreVaultGuess(this.secret(), attempt);
    const nextGuesses = [...this.guesses(), { attempt, clue }];
    this.guesses.set(nextGuesses);
    this.clearDraft();

    if (isVaultSolved(clue)) {
      this.status.set('won');
      this.message.set('Vault unlocked — pipeline cracked!');
      return;
    }

    if (nextGuesses.length >= this.maxAttempts) {
      this.status.set('lost');
      this.message.set(
        `Out of attempts. Secret was: ${this.secret().join(' → ')}`
      );
      return;
    }

    this.message.set(
      `${clue.exact} exact · ${clue.present} present — ${this.maxAttempts - nextGuesses.length} tries left`
    );
  }

  newPuzzle(): void {
    this.secret.set(createVaultSecret());
    this.guesses.set([]);
    this.clearDraft();
    this.status.set('playing');
    this.message.set('New vault generated. Deduce the operator order.');
  }
}
