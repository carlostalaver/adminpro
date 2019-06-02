import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { Sharedodule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Sharedodule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
