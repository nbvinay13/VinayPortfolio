import { Component, ChangeDetectionStrategy } from '@angular/core';
import { skillCategories } from '../../data/portfolio.data';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.html',
  styleUrl: './capabilities.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Capabilities {
  protected readonly categories = skillCategories;
}
