import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { projects } from '../../data/portfolio.data';
import { createDebouncedProjectSearch } from '../../shared/rxjs/debounced-search';

@Component({
  selector: 'app-projects',
  imports: [FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly querySubject = new Subject<string>();

  protected readonly operators = ['debounceTime', 'distinctUntilChanged', 'map'];
  protected readonly query = signal('');

  protected readonly filteredProjects = toSignal(
    createDebouncedProjectSearch(this.querySubject.asObservable(), projects, 300),
    { initialValue: projects }
  );

  onQueryChange(value: string): void {
    this.query.set(value);
    this.querySubject.next(value);
  }
}
