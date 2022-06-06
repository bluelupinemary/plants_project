import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractivemapComponent } from './components/interactivemap/interactivemap.component';
import { MapdetailsComponent } from './components/mapdetails/mapdetails.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { StateDropdownComponent } from './components/state-dropdown/state-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToprankingComponent } from './components/topranking/topranking.component';

@NgModule({
  declarations: [
    AppComponent,
    InteractivemapComponent,
    MapdetailsComponent,
    HeaderComponent,
    SearchbarComponent,
    StateDropdownComponent,
    ToprankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
