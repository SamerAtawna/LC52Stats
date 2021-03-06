import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HistoryComponent } from './history/history.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AgGridModule } from 'ag-grid-angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';


@NgModule({
  declarations: [AppComponent, HistoryComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    DataTablesModule,
    NgxDatatableModule,
    MatCheckboxModule,
    AgGridModule
    
  ],
  providers: [
    StatusBar,
    DataService,
    SocialSharing,
    AdMobFree,
    SplashScreen,
    Screenshot,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
