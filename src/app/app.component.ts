import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from '../providers/weather/weather';



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage";

  pages: any[] = [];

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private weather: WeatherProvider)
  {
    this.initializeApp();

  }


  //Após carregar o aplicativo
  ngAfterViewInit(){
    this.weather.getGeolocation().then(resp =>{
      let longitude = resp.coords.longitude;
      let latitude = resp.coords.latitude;
      this.weather.currentWeather(longitude, latitude)
        .subscribe(res =>{
          console.log(res);
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
