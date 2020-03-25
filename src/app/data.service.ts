import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Rest } from "./user";
import { Hist } from "./hist";

@Injectable({
  providedIn: "root"
})
export class DataService {
  apiUrl = "https://lc52counters.herokuapp.com/data";
  devUrl = "http://localhost:3000/data";
  alertUrl = "http://lc52stat.us-east-2.elasticbeanstalk.com/data";
  isDev = false;

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

  getDataAlter(): Observable<Rest[]> {
    console.log("aleter serve");
    return this.http.get<Rest[]>(this.alertUrl);
  }
  getHistory(): Observable<any[]> {
    return this.http.get("https://lc52counters.herokuapp.com/datahistory").pipe(
      map((x: [Hist]) => {
        return x.map(d => {
          return this.createArray([d.Date, ...d.Counters]);
        });
      })
    );
  }
}
