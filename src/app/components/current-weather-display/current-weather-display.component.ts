import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../models/current-weather';

@Component({
  selector: 'app-current-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent implements OnInit {
  @Input() city: string | null = null;
  @Input() region: string | null = null;
  @Input() country: string | null = null;
  @Input() loading: boolean = true;
  @Input() error: string | null = null;
  @Input() set currentWeather(data: WeatherData | null) {
    if (data) {
      this.temperature = data.temperature;
      this.description = data.description;
      this.humidity = data.humidity;
      this.windSpeed = data.windSpeed;
      this.precipitation = data.precipitation;
      this.cloudCover = data.cloudCover;
    }
  }
  
  temperature: number | null = null;
  description: string | null = null;
  humidity: number | null = null;
  windSpeed: number | null = null;
  precipitation: number | null = null;
  cloudCover: number | null = null;

  constructor() { }

  ngOnInit() {
    // No need to fetch data here anymore
  }
}
