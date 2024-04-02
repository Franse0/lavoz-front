import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  apiUrl =
    'Authorization: BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDM0NzUyNjQsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJwYW5jaHltYXJpbi5mbUBnbWFpbC5jb20ifQ.yvefqN3l-ifYVidvbZUPewUtgEbHYD7c816zBAfhShH-violdRn4ogGwbmq8cKDd2be4ux5UN8Ge5CnBkuvPPQ';
    constructor(private http: HttpClient) { }
    

    getWeather(): Observable<any> {
      return this.http.get(this.apiUrl);
    }}
