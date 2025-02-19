import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDisplayComponent } from './current-weather-display.component';

describe('CurrentWeatherDisplayComponent', () => {
  let component: CurrentWeatherDisplayComponent;
  let fixture: ComponentFixture<CurrentWeatherDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
