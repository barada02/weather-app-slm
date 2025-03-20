import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherServicesService } from '../service/weather-services.service';
import { LocationService, LocationDetails } from '../service/location.service';
import { WeatherData } from '../models/current-weather';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  standalone: true
})
export class LeftSidebarComponent implements OnInit {
  currentLocationCity: string = '';
  currentWeather: WeatherData | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  @Output() resetToCurrentLocation = new EventEmitter<void>();

  constructor(
    private weatherService: WeatherServicesService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather() {
    this.loading = true;
    this.error = null;

    this.locationService.getCurrentLocation().subscribe({
      next: (location: LocationDetails) => {
        this.currentLocationCity = location.city;
        
        // Get current weather for the location
        this.getWeatherData(location.city);
      },
      error: (error) => {
        console.error('Error getting location:', error);
        this.error = 'Failed to get location';
        this.loading = false;
      }
    });
  }

  getWeatherData(city: string) {
    this.weatherService.getWeatherData(city).subscribe({
      next: (data) => {
        if (data) {
          this.currentWeather = data;
        } else {
          this.error = 'Unable to fetch current weather data';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching current weather:', error);
        this.error = 'Failed to get current weather data';
        this.loading = false;
      }
    });
  }

  refreshWeather() {
    this.getCurrentLocationWeather();
  }

  onResetToCurrentLocation() {
    this.resetToCurrentLocation.emit();
  }

  openSettings() {
    // This will be implemented later when we add settings functionality
    console.log('Settings button clicked');
  }
}
