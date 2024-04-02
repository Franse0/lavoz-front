import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroments';
import { AsyncPipe } from '@angular/common';
import { key } from '../enviroments/apiclima';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-34.6002&lon=-58.9525&appid=${key}`;

  constructor(private http: HttpClient) { }

  getWeather(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
