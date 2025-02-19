export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    cloudCover: number;
  }

  export interface TomorrowApiResponse {
    data: {
      time: string;
      values: {
        temperature: number;
        humidity: number;
        windSpeed: number;
        precipitationProbability: number;
        cloudCover: number;
      };
    };
    location: {
      name: string;
    };
  }