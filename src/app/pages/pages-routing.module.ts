import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ObservablesComponent } from './observables/observables.component';

const ROUTES_PAGES: Routes = [  {
  path: '',
  component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
    { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
    { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
    { path: 'rxjs', component: ObservablesComponent, data: {titulo: 'RxJs'} },
    { path: 'account-settings', component: AccountSettingsComponent , data: {titulo: 'Ajustes del Tema'}},
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  ]
}];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES_PAGES)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
