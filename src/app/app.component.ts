import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrentWeatherDisplayComponent } from './components/current-weather-display/current-weather-display.component';
import { WeeklyForecastComponent } from './weekly-forecast/weekly-forecast.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CurrentWeatherDisplayComponent,
    WeeklyForecastComponent,
    HourlyForecastComponent,
    SearchBarComponent,
    LeftSidebarComponent,
 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app-slm';
}
