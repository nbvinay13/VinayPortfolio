export type TechPulseTag =
  | 'Angular'
  | 'RxJS'
  | 'NgRx'
  | 'AG-Grid'
  | 'ECharts'
  | 'Java'
  | 'Node.js'
  | 'Testing'
  | 'Fintech'
  | 'Banking'
  | 'Performance';

export interface TechPulseArticle {
  id: string;
  title: string;
  summary: string;
  tag: TechPulseTag;
  source: string;
  publishedAt: string;
  url: string;
}

export const techPulseTags: Array<TechPulseTag | 'All'> = [
  'All',
  'Angular',
  'RxJS',
  'NgRx',
  'AG-Grid',
  'ECharts',
  'Java',
  'Node.js',
  'Testing',
  'Fintech',
  'Performance',
  'Banking'
];

export const techPulseArticles: TechPulseArticle[] = [
  {
    id: 'ng-signals-rxjs',
    title: 'Signals + RxJS: when each reactive model wins',
    summary:
      'Use Signals for local UI state and RxJS for async orchestration — events, cancellation, and multi-source composition.',
    tag: 'Angular',
    source: 'Angular Docs / Community',
    publishedAt: '2026-08-12',
    url: 'https://angular.dev/guide/signals',
  },
  {
    id: 'switchmap-typeahead',
    title: 'Why switchMap is the default for typeahead',
    summary:
      'switchMap cancels in-flight work when the query changes — essential for search UIs that must stay snappy under fast typing.',
    tag: 'RxJS',
    source: 'RxJS Guide',
    publishedAt: '2026-07-28',
    url: 'https://rxjs.dev/api/operators/switchMap',
  },
  {
    id: 'vitest-angular21',
    title: 'Angular 21 unit testing with Vitest',
    summary:
      'Modern Angular apps default to Vitest for faster unit tests; enterprise banking teams often still run Karma + Jasmine.',
    tag: 'Testing',
    source: 'Angular Blog',
    publishedAt: '2026-06-18',
    url: 'https://angular.dev/guide/testing',
  },
  {
    id: 'nestjs-bff',
    title: 'Node.js BFF patterns for Angular frontends',
    summary:
      'A thin Express/Nest layer collapses chatty REST into page-shaped payloads and keeps secrets off the browser.',
    tag: 'Node.js',
    source: 'Node.js Architecture Notes',
    publishedAt: '2026-05-30',
    url: 'https://nodejs.org/en/docs',
  },
  {
    id: 'ag-grid-banking',
    title: 'AG Grid performance tips for banking tables',
    summary:
      'Virtual scrolling, immutable data, and careful cell renderers keep high-density transaction grids responsive.',
    tag: 'Banking',
    source: 'Enterprise UI Patterns',
    publishedAt: '2026-05-09',
    url: 'https://www.ag-grid.com/',
  },
  {
    id: 'onpush-defer',
    title: 'OnPush, @defer, and SSR hydration budgets',
    summary:
      'Ship less JS above the fold, keep change detection cheap, and let search engines index critical write-ups.',
    tag: 'Performance',
    source: 'Web Vitals + Angular SSR',
    publishedAt: '2026-04-21',
    url: 'https://angular.dev/guide/defer',
  },
  {
    id: 'marble-testing',
    title: 'Marble diagrams make operator contracts testable',
    summary:
      'Assert debounce, switchMap cancellation, and scan accumulation with marble expectations — recruiter-proof RxJS.',
    tag: 'Testing',
    source: 'RxJS Testing',
    publishedAt: '2026-03-14',
    url: 'https://rxjs.dev/guide/testing/marble-testing',
  },
  {
    id: 'share-replay-cache',
    title: 'shareReplay(1) for dashboard API caching',
    summary:
      'Multicast late subscribers onto the last successful response — great for wealth widgets and session-scoped feeds.',
    tag: 'RxJS',
    source: 'RxJS Operators',
    publishedAt: '2026-02-02',
    url: 'https://rxjs.dev/api/operators/shareReplay',
  },
];
