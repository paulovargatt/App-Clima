import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  locationInfo: any;
  cityName: string;
  slides = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.locationInfo = this.navParams.get("weatherInfo");

    if(this.locationInfo){
      this.cityName = this.locationInfo.weather.name;
      this.slides.push(this.locationInfo);
    }

  }

}
