import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";

import "rxjs/add/observable/forkJoin"
import "rxjs/add/operator/map";


@Injectable()
export class WeatherProvider {

  apiKey = "4d5569d7ccb9ee89c53db53065bf7cf8";

  constructor(public http: HttpClient,
              private geolocation: Geolocation) {

  }


  async getGeolocation() {
    return await this.geolocation.getCurrentPosition();
  }

  currentWeather(lon: number, lat: number): Observable<any>{
    const currentInfo = this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.apiKey}`);
    const forecastInfo = this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&APPID=${this.apiKey}`);

    return Observable.forkJoin([currentInfo, forecastInfo])
      .map(responses => {
          return [].concat(...responses);
      });

  }


}
