import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { Sharedodule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador.component';
//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ObservablesComponent } from './observables/observables.component';
import { LoginGuard } from '../services/guards/login.guard';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    // PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    ObservablesComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
  ],
  exports: [
    CommonModule,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    // PagesComponent,
    FormsModule,

  ],
  imports: [
    Sharedodule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ],
  providers: [
    LoginGuard,
    AdminGuard
  ]
})
export class PagesModule { }
