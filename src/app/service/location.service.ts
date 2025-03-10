import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.local';

export interface IpstackResponse {
  ip: string;
  city: string;
  region_name: string;
  country_name: string;
  location: {
    capital: string;
  };
}

export interface LocationDetails {
  city: string;
  region: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private ipstackUrl = 'http://api.ipstack.com';
  private ipstackKey = environment.ipstackKey;

  constructor(private http: HttpClient) { }

  private getIpAddress(): Observable<string> {
    return this.http.get('https://api.ipify.org?format=json').pipe(
      map((response: any) => response.ip),
      catchError(error => {
        console.error('Error getting IP:', error);
        return of('');
      })
    );
  }

  getCurrentLocation(): Observable<LocationDetails> {
    return this.getIpAddress().pipe(
      switchMap(ip => {
        if (!ip) {
          return this.http.get<IpstackResponse>(`${this.ipstackUrl}/check?access_key=${this.ipstackKey}`);
        }
        return this.http.get<IpstackResponse>(`${this.ipstackUrl}/${ip}?access_key=${this.ipstackKey}`);
      }),
      map(response => {
        return {
          city: response.city || response.location?.capital || 'Unknown City',
          region: response.region_name || 'Unknown Region',
          country: response.country_name || 'Unknown Country'
        };
      }),
      catchError(error => {
        console.error('Error fetching location:', error);
        return of({
          city: 'Unknown City',
          region: 'Unknown Region',
          country: 'Unknown Country'
        });
      })
    );
  }
}
