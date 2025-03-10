import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherServicesService } from '../../service/weather-services.service';
import { LocationService, LocationDetails } from '../../service/location.service';

@Component({
  selector: 'app-current-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent implements OnInit {
  city: string | null = null;
  region: string | null = null;
  country: string | null = null;
  temperature: number | null = null;
  description: string | null = null;
  humidity: number | null = null;
  windSpeed: number | null = null;
  precipitation: number | null = null;
  cloudCover: number | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private weatherService: WeatherServicesService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather() {
    this.loading = true;
    this.error = null;

    this.locationService.getCurrentLocation().subscribe({
      next: (location: LocationDetails) => {
        // Store all location details
        this.city = location.city;
        this.region = location.region;
        this.country = location.country;

        // Use only city for weather data
        this.weatherService.getWeatherData(location.city).subscribe({
          next: (data) => {
            if (data) {
              this.temperature = data.temperature;
              this.description = data.description;
              this.humidity = data.humidity;
              this.windSpeed = data.windSpeed;
              this.precipitation = data.precipitation;
              this.cloudCover = data.cloudCover;
            } else {
              this.error = 'Unable to fetch weather data';
            }
            this.loading = false;
          },
          error: (error) => {
            console.error('Error fetching weather:', error);
            this.error = 'Failed to get weather data';
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error getting location:', error);
        this.error = 'Failed to get location';
        this.loading = false;
      }
    });
  }

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
