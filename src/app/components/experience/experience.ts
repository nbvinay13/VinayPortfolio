import { Component, ChangeDetectionStrategy } from '@angular/core';
import { education, experience } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly experience = experience;
  protected readonly education = education;
}
