import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CurrentWeatherDisplayComponent } from './components/current-weather-display/current-weather-display.component';
import { ForecastDisplayComponent } from './forecast-display/forecast-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TestComponent,
    CurrentWeatherDisplayComponent,
    ForecastDisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app-slm';
}
