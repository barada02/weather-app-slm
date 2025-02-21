import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherServicesService } from '../service/weather-services.service';
import { DailyForecast } from '../models/forecast';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class WeeklyForecastComponent implements OnInit {
  weeklyForecast: DailyForecast[] = [];
  city: string = 'New York'; // Default city

  constructor(private weatherService: WeatherServicesService) {}

  ngOnInit(): void {
    this.getWeeklyForecast();
  }

  getWeeklyForecast() {
    this.weatherService.getForecastData(this.city).subscribe(
      forecast => {
        if (forecast) {
          this.weeklyForecast = forecast.daily;
        }
      }
    );
  }
}
