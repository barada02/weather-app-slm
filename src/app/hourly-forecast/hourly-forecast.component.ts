import { Component, OnInit, Input } from '@angular/core';
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
  @Input() hourlyForecast: HourlyForecast[] = [];
  @Input() city: string = 'New York';

  constructor() {}

  ngOnInit(): void {
    // No need to fetch data here anymore
  }
}
