import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrentWeatherDisplayComponent } from './components/current-weather-display/current-weather-display.component';
import { WeeklyForecastComponent } from './weekly-forecast/weekly-forecast.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { WeatherServicesService } from './service/weather-services.service';
import { LocationService, LocationDetails } from './service/location.service';
import { DailyForecast, HourlyForecast } from './models/forecast';
import { WeatherData } from './models/current-weather';


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
export class AppComponent implements OnInit {
  title = 'weather-app-slm';
  dailyForecast: DailyForecast[] = [];
  hourlyForecast: HourlyForecast[] = [];
  currentLocationCity: string = ''; // City from geolocation
  city: string = ''; // City used for API calls, initialized with currentLocationCity
  region: string = '';
  country: string = '';
  currentWeather: WeatherData | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private weatherService: WeatherServicesService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getLocationAndWeather();
  }

  getLocationAndWeather() {
    this.loading = true;
    this.error = null;

    this.locationService.getCurrentLocation().subscribe({
      next: (location: LocationDetails) => {
        this.currentLocationCity = location.city;
        this.city = this.currentLocationCity; // Initialize search city with current location
        this.region = location.region;
        this.country = location.country;
        
        // Get current weather and forecast data
        this.getWeatherData();
      },
      error: (error) => {
        console.error('Error getting location:', error);
        this.error = 'Failed to get location';
        this.loading = false;
      }
    });
  }

  getWeatherData() {
    // Get current weather
    this.weatherService.getWeatherData(this.city).subscribe({
      next: (data) => {
        if (data) {
          this.currentWeather = data;
        } else {
          this.error = 'Unable to fetch current weather data';
        }
        
        // Continue with forecast data
        this.getForecastData();
      },
      error: (error) => {
        console.error('Error fetching current weather:', error);
        this.error = 'Failed to get current weather data';
        
        // Still try to get forecast data
        this.getForecastData();
      }
    });
  }

  getForecastData() {
    this.weatherService.getForecastData(this.city).subscribe({
      next: (forecast) => {
        if (forecast) {
          this.dailyForecast = forecast.daily;
          this.hourlyForecast = forecast.hourly;
        } else {
          if (!this.error) { // Don't overwrite previous errors
            this.error = 'Unable to fetch forecast data';
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
        if (!this.error) { // Don't overwrite previous errors
          this.error = 'Failed to get forecast data';
        }
        this.loading = false;
      }
    });
  }

  // Method to update city from search bar
  updateCity(newCity: string) {
    this.city = newCity;
    this.loading = true;
    this.error = null;
    this.getWeatherData();
  }

  // Method to reset to current location
  resetToCurrentLocation() {
    if (this.currentLocationCity) {
      this.city = this.currentLocationCity;
      this.loading = true;
      this.error = null;
      this.getWeatherData();
    } else {
      // If current location isn't available, try to get it again
      this.getLocationAndWeather();
    }
  }
}
