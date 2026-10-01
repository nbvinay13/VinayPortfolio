import { Component, ChangeDetectionStrategy } from '@angular/core';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
