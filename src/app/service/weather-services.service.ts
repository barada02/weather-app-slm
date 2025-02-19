import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { WeatherData,TomorrowApiResponse} from '../models/current-weather';
import { ForecastResponse, DailyForecast, HourlyForecast } from '../models/forecast';
import { environment } from '../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WeatherServicesService {

  constructor(private http: HttpClient) { }

  private apiKey = environment.apiKey;
  private apiUrl = 'https://api.tomorrow.io/v4/weather/realtime';
  private forecastUrl = 'https://api.tomorrow.io/v4/weather/forecast';

  getWeatherData(city: string): Observable<WeatherData | null> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    const params = new HttpParams()
    .set('location', city)
    .set('units', 'metric');

    return this.http.get<TomorrowApiResponse>(this.apiUrl, { headers, params }).pipe(
      map(response => {
        const weatherData: WeatherData = {
          city: response.location.name,
          temperature: response.data.values.temperature,
          description: this.getWeatherDescription(
            response.data.values.cloudCover,
            response.data.values.precipitationProbability
          ),
          humidity: response.data.values.humidity,
          windSpeed: response.data.values.windSpeed,
          precipitation: response.data.values.precipitationProbability,
          cloudCover: response.data.values.cloudCover
        };
        
        
        
        return weatherData;
      }),
      catchError(error => {
        console.error('Error fetching weather:', error);
        return of(null);})

    );
  }

  getForecastData(city: string): Observable<{ daily: DailyForecast[], hourly: HourlyForecast[] } | null> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    const params = new HttpParams()
      .set('location', city)
      .set('units', 'metric');

    return this.http.get<ForecastResponse>(this.forecastUrl, { headers, params }).pipe(
      map(response => {
        if (!response.timelines.daily || !response.timelines.hourly) {
          throw new Error('Missing timeline data');
        }

        const dailyForecast = response.timelines.daily.map(day => ({
          date: day.time,
          temperature: day.values.temperature,
          temperatureMin: day.values.temperature - 5, 
          temperatureMax: day.values.temperature + 5, 
          humidity: day.values.humidity,
          precipitation: day.values.precipitationProbability,
          windSpeed: day.values.windSpeed,
          description: this.getWeatherDescription(
            day.values.cloudCover,
            day.values.precipitationProbability
          )
        }));

        const hourlyForecast = response.timelines.hourly.map(hour => ({
          time: hour.time,
          temperature: hour.values.temperature,
          humidity: hour.values.humidity,
          precipitation: hour.values.precipitationProbability,
          windSpeed: hour.values.windSpeed,
          description: this.getWeatherDescription(
            hour.values.cloudCover,
            hour.values.precipitationProbability
          )
        }));

        return {
          daily: dailyForecast,
          hourly: hourlyForecast
        };
      }),
      catchError(error => {
        console.error('Error fetching forecast:', error);
        return of(null);
      })
    );
  }

  private getWeatherDescription(cloudCover: number, precipProb: number): string {
    if (precipProb > 50) {
      return 'Likely to rain';
    } else if (cloudCover > 70) {
      return 'Cloudy';
    } else if (cloudCover > 30) {
      return 'Partly cloudy';
    } else {
      return 'Clear';
    }
  }
}
