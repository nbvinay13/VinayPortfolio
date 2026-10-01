import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { TechPulse } from './tech-pulse';
import { TechPulseService } from '../../services/tech-pulse.service';

describe('TechPulse component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechPulse],
      providers: [TechPulseService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TechPulse);
    expect(fixture.componentInstance).toBeTruthy();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Tech Pulse');
    expect(el.textContent).toContain('switchMap');
  });
});
