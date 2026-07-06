import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService, WeatherForecast } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather forecasts', () => {
    const dummyForecasts: WeatherForecast[] = [
      { date: '2026-07-07', temperatureC: 24, temperatureF: 75, summary: 'Cool' },
      { date: '2026-07-08', temperatureC: 32, temperatureF: 90, summary: 'Hot' }
    ];

    service.getForecasts().subscribe((forecasts) => {
      expect(forecasts.length).toBe(2);
      expect(forecasts).toEqual(dummyForecasts);
    });

    const req = httpMock.expectOne('https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast');
    expect(req.request.method).toBe('GET');
    req.flush(dummyForecasts);
  });
});
