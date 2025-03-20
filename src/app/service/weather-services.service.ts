import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { WeatherData,TomorrowApiResponse} from '../models/current-weather';
import { ForecastResponse, DailyForecast, HourlyForecast } from '../models/forecast';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WeatherServicesService {

  constructor(private http: HttpClient) { }

  private apiKey = environment.tomorrowIoApiKey2;
  private apiUrl = 'https://api.tomorrow.io/v4/weather/realtime';
  private forecastUrl = 'https://api.tomorrow.io/v4/weather/forecast';

  getWeatherData(city: string): Observable<WeatherData | null> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    const params = new HttpParams()
      .set('location', city)
      .set('units', 'metric');

    return this.http.get<TomorrowApiResponse>(this.apiUrl, { headers, params }).pipe(
      map(response => {
        if (!response || !response.data || !response.data.values) {
          return null;
        }

        return {
          city: city,
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
      }),
      catchError(error => {
        console.error('Error fetching weather:', error);
        return of(null);
      })
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
          temperature: day.values.temperatureAvg ?? day.values.temperature ?? 0,
          temperatureMin: day.values.temperatureMin ?? 0,
          temperatureMax: day.values.temperatureMax ?? 0,
          humidity: day.values.humidityAvg ?? day.values.humidity ?? 0,
          precipitation: day.values.precipitationProbabilityAvg ?? day.values.precipitationProbability ?? 0,
          windSpeed: day.values.windSpeedAvg ?? day.values.windSpeed ?? 0,
          description: this.getWeatherDescription(
            day.values.cloudCoverAvg ?? day.values.cloudCover,
            day.values.precipitationProbabilityAvg ?? day.values.precipitationProbability
          )
        }));

        const hourlyForecast = response.timelines.hourly.map(hour => ({
          time: hour.time,
          temperature: hour.values.temperature ?? 0,
          humidity: hour.values.humidity ?? 0,
          precipitation: hour.values.precipitationProbability ?? 0,
          windSpeed: hour.values.windSpeed ?? 0,
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

  private getWeatherDescription(cloudCover: number | undefined, precipProb: number | undefined): string {
    const cloudCoverValue = cloudCover ?? 0;
    const precipProbValue = precipProb ?? 0;

    if (precipProbValue > 50) {
      return 'Likely to rain';
    } else if (cloudCoverValue > 50) {
      return 'Cloudy';
    } else {
      return 'Clear';
    }
  }
}
