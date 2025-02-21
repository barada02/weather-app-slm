import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherServicesService } from '../service/weather-services.service';
import { HourlyForecast } from '../models/forecast';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class HourlyForecastComponent implements OnInit {
  hourlyForecast: HourlyForecast[] = [];
  city: string = 'New York'; // Default city

  constructor(private weatherService: WeatherServicesService) {}

  ngOnInit(): void {
    this.getHourlyForecast();
  }

  getHourlyForecast() {
    this.weatherService.getForecastData(this.city).subscribe(
      forecast => {
        if (forecast) {
          this.hourlyForecast = forecast.hourly;
        }
      }
    );
  }
}
