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
  cloudBase?: number;
  cloudCeiling?: number | null;
  cloudCover?: number;
  cloudCoverAvg?: number;
  dewPoint?: number;
  humidity?: number;
  humidityAvg?: number;
  precipitationProbability?: number;
  precipitationProbabilityAvg?: number;
  pressureSeaLevel?: number;
  temperature?: number;
  temperatureAvg?: number;
  temperatureMin?: number;
  temperatureMax?: number;
  temperatureApparent?: number;
  uvIndex?: number;
  visibility?: number;
  weatherCode?: number;
  windDirection?: number;
  windSpeed?: number;
  windSpeedAvg?: number;
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
