import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherServicesService } from '../service/weather-services.service';
import { DailyForecast, HourlyForecast } from '../models/forecast';

@Component({
  selector: 'app-forecast-display',
  templateUrl: './forecast-display.component.html',
  styleUrls: ['./forecast-display.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class ForecastDisplayComponent implements OnInit {
  dailyForecast: DailyForecast[] = [];
  hourlyForecast: HourlyForecast[] = [];
  city: string = 'New York'; // Default city

  constructor(private weatherService: WeatherServicesService) {}

  ngOnInit(): void {
    this.getForecastData();
  }

  getForecastData() {
    this.weatherService.getForecastData(this.city).subscribe(
      forecast => {
        if (forecast) {
          this.dailyForecast = forecast.daily;
          this.hourlyForecast = forecast.hourly;
        }
      }
    );
  }
}
