import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Rest } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://lc52counters.herokuapp.com/data';
  devUrl = 'http://localhost:3000/data';
  isDev = false;

  constructor(private http: HttpClient) {}

  getData(): Observable<Rest[]> {
    return this.http.get<Rest[]>(this.isDev ? this.devUrl : this.apiUrl);
  }
}
