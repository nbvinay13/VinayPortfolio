import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Projects } from '../../components/projects/projects';
import { TechPulse } from '../../components/tech-pulse/tech-pulse';
import { GamesTeaser } from '../../components/games-teaser/games-teaser';
import { Capabilities } from '../../components/capabilities/capabilities';
import { Architecture } from '../../components/architecture/architecture';
import { Experience } from '../../components/experience/experience';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Projects,
    TechPulse,
    GamesTeaser,
    Capabilities,
    Architecture,
    Experience,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
