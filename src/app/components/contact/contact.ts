import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly profile = profile;
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  protected readonly submitted = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${this.name() || 'someone'}`);
    const body = encodeURIComponent(
      `${this.message()}\n\n— ${this.name()}\n${this.email()}`
    );
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
    this.submitted.set(true);
  }
}
