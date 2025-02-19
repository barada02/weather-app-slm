import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherServicesService } from './weather-services.service';
import { WeatherData, TomorrowApiResponse } from '../models/current-weather';
import { HttpErrorResponse } from '@angular/common/http';

describe('WeatherServicesService', () => {
  let service: WeatherServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherServicesService]
    });
    service = TestBed.inject(WeatherServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data for a given city', fakeAsync(() => {
    const mockCity = 'London';
    const mockResponse: TomorrowApiResponse = {
      data: {
        time: '2024-02-19T10:00:00Z',
        values: {
          temperature: 20,
          humidity: 65,
          windSpeed: 10,
          precipitationProbability: 10,
          cloudCover: 30
        }
      },
      location: {
        name: 'London'
      }
    };

    let actualResult: WeatherData | null = null;

    service.getWeatherData(mockCity).subscribe({
      next: (result) => {
        actualResult = result;
      }
    });

    const req = httpMock.expectOne(request => 
      request.url === 'https://api.tomorrow.io/v4/weather/realtime' &&
      request.params.get('location') === mockCity
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('apikey')).toBeTruthy();
    
    req.flush(mockResponse);
    tick();

    expect(actualResult).toBeTruthy();
    if (actualResult) {
      expect(actualResult.city).toBe('London');
      expect(actualResult.temperature).toBe(20);
      expect(actualResult.humidity).toBe(65);
      expect(actualResult.windSpeed).toBe(10);
      expect(actualResult.precipitation).toBe(10);
      expect(actualResult.cloudCover).toBe(30);
    }
  }));

  it('should handle API errors gracefully', fakeAsync(() => {
    const mockCity = 'NonExistentCity';
    let actualResult: WeatherData | null = null;
    
    service.getWeatherData(mockCity).subscribe({
      next: (result) => {
        actualResult = result;
      }
    });

    const req = httpMock.expectOne(request => 
      request.url === 'https://api.tomorrow.io/v4/weather/realtime'
    );

    req.error(new ErrorEvent('API Error'));
    tick();

    expect(actualResult).toBeNull();
  }));
});
