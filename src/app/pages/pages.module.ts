import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { Sharedodule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador.component';
//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
  ],
  exports: [
    CommonModule,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    FormsModule,

  ],
  imports: [
    Sharedodule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
