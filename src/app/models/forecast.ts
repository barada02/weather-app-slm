export interface ForecastResponse {
  timelines: {
    minutely?: TimelineData[];
    hourly?: TimelineData[];
    daily?: TimelineData[];
  };
  location: Location;
}

export interface TimelineData {
  time: string;
  values: WeatherValues;
}

export interface WeatherValues {
  cloudBase: number;
  cloudCeiling: number | null;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  precipitationProbability: number;
  pressureSeaLevel: number;
  temperature: number;
  temperatureApparent: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windSpeed: number;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

export interface DailyForecast {
  date: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  description: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  description: string;
}
