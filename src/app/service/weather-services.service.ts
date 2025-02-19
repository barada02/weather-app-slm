import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { WeatherData,TomorrowApiResponse} from '../models/current-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherServicesService {

  constructor(private http: HttpClient) { }

  private apiKey = 'jyEodjqRRldYkRohEGaoEgiXLN9A61pW'; 
  private apiUrl = 'https://api.tomorrow.io/v4/weather/realtime';

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


