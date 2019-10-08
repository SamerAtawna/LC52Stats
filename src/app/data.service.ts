import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Rest } from './user';
import { Hist } from './hist';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://lc52counters.herokuapp.com/data';
  devUrl = 'http://localhost:3000/data';
  isDev = true;

  constructor(private http: HttpClient) {}
  createArray(arr) {
    return {
      Date: arr[0],
      black: arr[1].Count,
      japan: arr[2].Count,
      power: arr[3].Count
    };
  }
  getData(): Observable<Rest[]> {
    return this.http.get<Rest[]>(this.isDev ? this.devUrl : this.apiUrl);
  }
  getHistory(): Observable<any[]> {
    return this.http.get('http://localhost:3000/datahistory').pipe(
      map((x: [Hist]) => {
        return x.map(d => {
          return this.createArray([d.Date, ...d.Counters]);
        });
      })
    );
  }
}
