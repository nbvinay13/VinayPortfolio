import { describe, expect, it } from 'vitest';
import { filterProjects, matchesQuery } from './project-filter.util';
import type { Project } from '../../data/portfolio.data';

const sample: Project[] = [
  {
    id: 'a',
    title: 'ENBD Banking',
    role: 'Engineer',
    problem: 'Wealth dashboard for RM advisors',
    stack: ['Angular', 'RxJS'],
    achievements: ['Built charts'],
    links: [],
    accent: '#000',
  },
  {
    id: 'b',
    title: 'Cynergy Payments',
    role: 'Software Engineer',
    problem: 'Internal transfer flows',
    stack: ['Angular', 'TypeScript'],
    achievements: ['Manage Payee'],
    links: [],
    accent: '#111',
  },
];

describe('filterProjects', () => {
  it('returns all projects for empty query', () => {
    expect(filterProjects(sample, '')).toEqual(sample);
    expect(filterProjects(sample, '   ')).toEqual(sample);
  });

  it('matches case-insensitively on title and stack', () => {
    expect(filterProjects(sample, 'enbd')).toHaveLength(1);
    expect(filterProjects(sample, 'rxjs')).toHaveLength(1);
    expect(filterProjects(sample, 'ANGULAR')).toHaveLength(2);
  });

  it('returns empty when nothing matches', () => {
    expect(filterProjects(sample, 'graphql')).toHaveLength(0);
  });
});

describe('matchesQuery', () => {
  it('treats blank query as match-all', () => {
    expect(matchesQuery('hello', '')).toBe(true);
  });

  it('checks inclusion case-insensitively', () => {
    expect(matchesQuery('Angular Signals', 'signal')).toBe(true);
    expect(matchesQuery('Angular Signals', 'vue')).toBe(false);
  });
});
