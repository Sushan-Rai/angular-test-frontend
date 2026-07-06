import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherService, WeatherForecast } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [DatePipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  private readonly weatherService = inject(WeatherService);

  readonly forecasts = signal<WeatherForecast[]>([]);
  readonly loading = signal<boolean>(false);
  readonly errorMsg = signal<string | null>(null);
  readonly totalCount = computed(() => this.forecasts().length);

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
    this.loading.set(true);
    this.errorMsg.set(null);

    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        this.forecasts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('API call failed:', err);
        this.errorMsg.set('Failed to retrieve weather forecasts. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  refresh(): void {
    this.fetchWeather();
  }
}
