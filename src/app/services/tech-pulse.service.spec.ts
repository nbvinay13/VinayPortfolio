import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it, beforeEach } from 'vitest';
import { TechPulseService } from './tech-pulse.service';

describe('TechPulseService', () => {
  let service: TechPulseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechPulseService);
  });

  it('filters articles by tag and query synchronously', () => {
    const allAngular = service.filterArticlesSync({ query: '', tag: 'Angular' });
    expect(allAngular.length).toBeGreaterThan(0);
    expect(allAngular.every((a) => a.tag === 'Angular')).toBe(true);

    const rxjsHits = service.filterArticlesSync({ query: 'switchMap', tag: 'All' });
    expect(rxjsHits.some((a) => a.title.toLowerCase().includes('switchmap'))).toBe(true);
  });

  it('fetchArticles returns filtered results after delay', async () => {
    const articles = await firstValueFrom(
      service.fetchArticles({ query: 'vitest', tag: 'Testing' }, 0)
    );
    expect(articles.length).toBeGreaterThan(0);
    expect(articles.every((a) => a.tag === 'Testing')).toBe(true);
  });

  it('fetchArticles errors once when simulateNextFailure is set', async () => {
    service.simulateNextFailure();
    await expect(
      firstValueFrom(service.fetchArticles({ query: '', tag: 'All' }, 0))
    ).rejects.toThrow(/Simulated network failure/);

    const recovered = await firstValueFrom(
      service.fetchArticles({ query: '', tag: 'All' }, 0)
    );
    expect(recovered.length).toBeGreaterThan(0);
  });
});
