import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    RouterModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ],
  providers: [],
})
export class Sharedodule { }
