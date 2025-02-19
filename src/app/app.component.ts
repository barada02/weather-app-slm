import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentWeatherDisplayComponent } from './components/current-weather-display/current-weather-display.component';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrentWeatherDisplayComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app-slm';
}
