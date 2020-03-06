import { Injectable } from '@angular/core';
import { TemperatureConversion } from '@lcu/common';
import { of } from 'rxjs/internal/observable/of';
import { SingleSeriesPipe } from './pipes/single-series.pipe';
import { MultiSeriesPipe, SeriesMapping } from './pipes/multi-series.pipe';
import { bubbleWeather } from './data';

@Injectable()
export class DataService {
  private readonly weatherData: any;
  private readonly dataMapping: SeriesMapping;

  constructor(
    private singleSeriesPipe: SingleSeriesPipe,
    private multiSeriesPipe: MultiSeriesPipe
  ) {
    this.weatherData = {
      routes: [],
      points: [
        { lat: 39.73845, lng: -104.98486, absoluteSeconds: 1582959013 },
        { lat: 39.73687, lng: -104.99354, absoluteSeconds: 1582959073 },
        { lat: 39.73688, lng: -104.99943, absoluteSeconds: 1582959133 },
        { lat: 39.72646, lng: -105.00019, absoluteSeconds: 1582959193 },
        { lat: 39.72576, lng: -105.0047, absoluteSeconds: 1582959253 },
        { lat: 39.72576, lng: -105.01197, absoluteSeconds: 1582959313 },
        { lat: 39.72558, lng: -105.01817, absoluteSeconds: 1582959373 },
        { lat: 39.72568, lng: -105.03054, absoluteSeconds: 1582959433 },
        { lat: 39.72579, lng: -105.04957, absoluteSeconds: 1582959493 },
        { lat: 39.72562, lng: -105.07905, absoluteSeconds: 1582959553 },
        { lat: 39.72553, lng: -105.10031, absoluteSeconds: 1582959613 },
        { lat: 39.72547, lng: -105.11719, absoluteSeconds: 1582959673 },
        { lat: 39.7254, lng: -105.14103, absoluteSeconds: 1582959733 },
        { lat: 39.72538, lng: -105.17442, absoluteSeconds: 1582959793 },
        { lat: 39.72567, lng: -105.18235, absoluteSeconds: 1582959853 },
        { lat: 39.72144, lng: -105.18578, absoluteSeconds: 1582959913 },
        { lat: 39.71325, lng: -105.19363, absoluteSeconds: 1582959973 },
        { lat: 39.70204, lng: -105.20228, absoluteSeconds: 1582960033 },
        { lat: 39.69589, lng: -105.2086, absoluteSeconds: 1582960093 },
        { lat: 39.69621, lng: -105.21789, absoluteSeconds: 1582960153 },
        { lat: 39.69858, lng: -105.23573, absoluteSeconds: 1582960213 }
      ],
      forecast: {
        surfaceTemperature: [
          294.05093, 293.98962, 293.93027, 293.66013, 293.69525, 293.63605, 293.5788,
          293.52246, 293.3024, 293.09354, 293.0372, 292.4603, 292.405, 292.60583,
          292.6743, 292.6405, 291.4038, 291.36887, 291.3361, 289.76535, 289.73053
        ],
        roadTemperature: [
          300.6113756190697, 300.58576762519095, 300.56100490308916, 300.2980084944496,
          299.37169343714174, 299.34218923346236, 299.3136335795203, 299.28556136476334,
          299.02177407371255, 298.69852305313736, 298.67020041745974, 297.8943084424042,
          297.85765338011055, 297.6481192071244, 297.49826336678103, 297.4727497381697,
          296.266215067706, 296.2302159508855, 296.1964976878412, 295.2199846656247,
          295.1823719584395
        ]
      }
    };
    this.dataMapping = {
      fieldValues: ['forecast.surfaceTemperature', 'forecast.roadTemperature'],
      fieldName: 'points.absoluteSeconds',
      seriesNames: ['Surface Temperature', 'Road Temperature']
    };
  }


  public GetSingleWeatherData(): any {
    const wData = JSON.parse(JSON.stringify(this.weatherData)); // Deep copy

    let data = this.formatData(wData);

    data = this.singleSeriesPipe.transform(data, this.dataMapping);

    return of(data);
  }

  public GetMultiWeatherData(): any {
    const wData = JSON.parse(JSON.stringify(this.weatherData)); // Deep copy

    let data = this.formatData(wData);

    data = this.multiSeriesPipe.transform(data, this.dataMapping);

    return of(data);
  }

  public GetBubbleWeatherData(): any {
    const wData = JSON.parse(JSON.stringify(bubbleWeather)); // Deep copy

    return of(wData);
  }

  private formatData(data: any): any {
    const newData = { ...data };

    newData.forecast.surfaceTemperature.forEach((temp: number, index: number) => {
      newData.forecast.surfaceTemperature[index] = TemperatureConversion.KelvinToFahrenheit(temp);
    });
    newData.forecast.roadTemperature.forEach((temp: number, index: number) => {
      newData.forecast.roadTemperature[index] = TemperatureConversion.KelvinToFahrenheit(temp);
    });

    newData.points.forEach((point: any, index: number) => {
      newData.points[index].absoluteSeconds = new Date(point.absoluteSeconds * 1000);
    });

    return newData;
  }
}
