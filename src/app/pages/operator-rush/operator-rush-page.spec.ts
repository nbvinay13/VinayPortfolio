import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, beforeEach } from 'vitest';
import { OperatorRushPage } from './operator-rush-page';
import { RxArcadeEngine } from '../../services/rx-arcade.engine';

describe('OperatorRushPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorRushPage],
      providers: [provideRouter([]), RxArcadeEngine],
    }).compileComponents();
  });

  it('should create and start a round', () => {
    const fixture = TestBed.createComponent(OperatorRushPage);
    const page = fixture.componentInstance;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Operator Rush');
    page.start();
    fixture.detectChanges();
    expect(page['state']().phase).toBe('running');

    page.stop();
    fixture.detectChanges();
    expect(page['state']().phase).toBe('finished');
  });
});
