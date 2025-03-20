import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DailyForecast } from '../models/forecast';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class WeeklyForecastComponent implements OnInit {
  @Input() weeklyForecast: DailyForecast[] = [];
  @Input() city: string = 'New York';

  constructor() {}

  ngOnInit(): void {
    // No need to fetch data here anymore
  }
}
