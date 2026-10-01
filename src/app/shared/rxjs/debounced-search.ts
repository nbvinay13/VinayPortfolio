import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { filterProjects } from './project-filter.util';
import type { Project } from '../../data/portfolio.data';

/**
 * Shared typeahead pipeline used by Projects search.
 * input$ → debounce → distinct → filter list
 */
export function createDebouncedProjectSearch(
  query$: Observable<string>,
  source: Project[],
  debounceMs = 300
): Observable<Project[]> {
  return query$.pipe(
    startWith(''),
    debounceTime(debounceMs),
    distinctUntilChanged(),
    map((query) => filterProjects(source, query))
  );
}
