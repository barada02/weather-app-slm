import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDisplayComponent } from './forecast-display.component';

describe('ForecastDisplayComponent', () => {
  let component: ForecastDisplayComponent;
  let fixture: ComponentFixture<ForecastDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
