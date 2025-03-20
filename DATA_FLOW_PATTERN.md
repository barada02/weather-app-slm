# Weather App Data Flow Pattern

## Overview

This document explains the data flow pattern implemented in the Weather App. The application follows a centralized data management approach with a parent-child component hierarchy to optimize API calls and maintain a clear flow of information.

## Data Flow Architecture

### 1. Centralized Data Fetching

Instead of having each component make its own API calls, we've centralized data fetching in the parent component (`AppComponent`). This approach:

- Reduces duplicate API calls
- Simplifies state management
- Creates a single source of truth for forecast data

### 2. Component Hierarchy

```
AppComponent (Parent)
├── SearchBarComponent
├── CurrentWeatherDisplayComponent
├── HourlyForecastComponent
└── WeeklyForecastComponent
```

### 3. Data Flow Sequence

1. **Initialization Flow**:
   - `AppComponent` initializes and calls `getForecastData()`
   - Weather service makes a single API call to Tomorrow.io
   - Data is processed and stored in parent component properties
   - Data flows down to child components via `@Input()` bindings

2. **User Interaction Flow**:
   - User enters a city in `SearchBarComponent`
   - Search component emits `cityChanged` event
   - Parent component catches event and updates city property
   - Parent component calls `getForecastData()` with new city
   - Updated data flows down to child components

## Benefits of This Pattern

### Efficiency

- **Single API Call**: Both hourly and daily forecasts are fetched in one request
- **Reduced Network Traffic**: Eliminates redundant API calls
- **Better Performance**: Less processing overhead

### Maintainability

- **Clear Responsibility**: Each component has a specific role
- **Simplified Components**: Child components focus on display, not data fetching
- **Centralized Error Handling**: All API-related errors are handled in one place

### Scalability

- **Easy to Add Components**: New components can simply receive data via inputs
- **Consistent State**: All components work with the same data
- **Simplified Testing**: Components with inputs are easier to test

## Code Examples

### Parent Component Data Fetching

```typescript
// app.component.ts
export class AppComponent implements OnInit {
  dailyForecast: DailyForecast[] = [];
  hourlyForecast: HourlyForecast[] = [];
  city: string = 'New York';
  
  constructor(private weatherService: WeatherServicesService) {}

  ngOnInit(): void {
    this.getForecastData();
  }

  getForecastData() {
    this.weatherService.getForecastData(this.city).subscribe({
      next: (forecast) => {
        if (forecast) {
          this.dailyForecast = forecast.daily;
          this.hourlyForecast = forecast.hourly;
        }
      }
    });
  }
  
  updateCity(newCity: string) {
    this.city = newCity;
    this.getForecastData();
  }
}
```

### Child Component Receiving Data

```typescript
// hourly-forecast.component.ts
export class HourlyForecastComponent {
  @Input() hourlyForecast: HourlyForecast[] = [];
  @Input() city: string = 'New York';
}
```

### Event Communication

```typescript
// search-bar.component.ts
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() cityChanged = new EventEmitter<string>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.cityChanged.emit(this.searchQuery.trim());
    }
  }
}
```

## Conclusion

This centralized data flow pattern optimizes the application's performance by reducing API calls while maintaining a clean component architecture. The parent component acts as a coordinator that manages data fetching and distribution, while child components focus on presenting the data to the user.
