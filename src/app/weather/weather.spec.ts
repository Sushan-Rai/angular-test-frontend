import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { Weather } from './weather';
import { WeatherService } from '../services/weather.service';

class MockWeatherService {
  getForecasts() {
    return of([
      { date: '2026-07-07', temperatureC: 25, temperatureF: 77, summary: 'Warm' }
    ]);
  }
}

describe('Weather', () => {
  let component: Weather;
  let fixture: ComponentFixture<Weather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Weather],
      providers: [
        { provide: WeatherService, useClass: MockWeatherService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Weather);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather forecasts on init', () => {
    expect(component.forecasts().length).toBe(1);
    expect(component.forecasts()[0].summary).toBe('Warm');
    expect(component.totalCount()).toBe(1);
  });
});
