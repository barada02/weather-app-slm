import { Component, OnInit } from '@angular/core';
import { WeatherServicesService } from '../../service/weather-services.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-current-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent  {
  city: string |null = null;
  temperature: number |null = null;
  description: string |null = null;
  humidity: number |null = null;
  windSpeed: number |null = null;
  precipitation: number |null = null;
  cloudCover: number |null = null;

  constructor(private weatherService: WeatherServicesService) { }

  showOnUi() {
    this.weatherService.getWeatherData('San Francisco').subscribe(data => {
      if (data){
        this.city = data.city;
        this.temperature = data.temperature;
        this.description = data.description;
        this.humidity = data.humidity;
        this.windSpeed = data.windSpeed;
        this.precipitation = data.precipitation;
        this.cloudCover = data.cloudCover;
      }
    });
  }
}
