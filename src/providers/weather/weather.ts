import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class WeatherProvider {

  constructor(public http: HttpClient,
              private geolocation: Geolocation) {

  }


  async getGeolocation() {
    return await this.geolocation.getCurrentPosition();
  }


}
