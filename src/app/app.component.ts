import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from '../providers/weather/weather';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, AfterViewInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage";

  pages: any[] = [];
  location = {};
  weather: any;
  forecast: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private weatherProvider: WeatherProvider,
              public storage: Storage)
  {
    this.initializeApp();

  }

  ngOnInit(){
    this.storage.forEach((value, key, index) => {
     this.pages.push(JSON.parse(value));
    })
  }
  //Após carregar o aplicativo
  ngAfterViewInit(){
    this.weatherProvider.getGeolocation().then(resp =>{
      let longitude = resp.coords.longitude;
      let latitude = resp.coords.latitude;
      this.weatherProvider.currentWeather(longitude, latitude)
        .subscribe(res =>{
          if(res.length > 0){
            this.weather = res[0];

            this.location = {
              id: res[0].id,
              icon: `http://openweathermap.org/img/w/${res[0].weather[0].icon}.png`,
              weather: res[0],
              forecast: res[1]
            }
            this.storage.set(`location_${res[0].id}`, JSON.stringify(this.location));
            this.nav.setRoot("HomePage",{"weatherInfo": this.location});

          }
        })
    })
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {


    this.nav.setRoot("HomePage",{"weatherInfo": page});
  }
}
