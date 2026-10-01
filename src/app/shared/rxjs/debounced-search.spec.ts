import { describe, expect, it, vi } from 'vitest';
import { Subject } from 'rxjs';
import { createDebouncedProjectSearch } from './debounced-search';
import type { Project } from '../../data/portfolio.data';

const sample: Project[] = [
  {
    id: '1',
    title: 'ENBD',
    role: 'Engineer',
    problem: 'Banking UI',
    stack: ['Angular'],
    achievements: [],
    links: [],
    accent: '#000',
  },
  {
    id: '2',
    title: 'Payments',
    role: 'Engineer',
    problem: 'Transfers',
    stack: ['Node.js'],
    achievements: [],
    links: [],
    accent: '#111',
  },
];

describe('createDebouncedProjectSearch', () => {
  it('emits full list on start and filters after debounce', async () => {
    vi.useFakeTimers();
    const query$ = new Subject<string>();
    const results: Project[][] = [];
    const sub = createDebouncedProjectSearch(query$, sample, 300).subscribe((list) => {
      results.push(list);
    });

    // startWith('') emits after debounce too
    await vi.advanceTimersByTimeAsync(300);
    expect(results.at(-1)).toHaveLength(2);

    query$.next('enbd');
    await vi.advanceTimersByTimeAsync(299);
    expect(results.at(-1)).toHaveLength(2); // not yet
    await vi.advanceTimersByTimeAsync(1);
    expect(results.at(-1)).toHaveLength(1);
    expect(results.at(-1)?.[0]?.id).toBe('1');

    sub.unsubscribe();
    vi.useRealTimers();
  });

  it('ignores duplicate consecutive queries via distinctUntilChanged', async () => {
    vi.useFakeTimers();
    const query$ = new Subject<string>();
    const results: Project[][] = [];
    const sub = createDebouncedProjectSearch(query$, sample, 100).subscribe((list) =>
      results.push(list)
    );

    await vi.advanceTimersByTimeAsync(100);
    const afterStart = results.length;

    query$.next('pay');
    await vi.advanceTimersByTimeAsync(100);
    query$.next('pay');
    await vi.advanceTimersByTimeAsync(100);

    expect(results.length).toBe(afterStart + 1);
    sub.unsubscribe();
    vi.useRealTimers();
  });
});
