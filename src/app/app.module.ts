import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// pages
import { HomepageComponent } from './homepage/homepage.component';

// material
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
// services
import { HttpClientModule } from '@angular/common/http';// for linking with the backend node server

import { HttpModule } from '@angular/http';
import { SqlapiService } from './sqlapi.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ SqlapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
