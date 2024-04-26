import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  apiUrl ="https://dolarapi.com/v1/dolares/blue";

    constructor(private http: HttpClient) { }
    

    getDolar(): Observable<any> {
      return this.http.get(this.apiUrl);
    }}
