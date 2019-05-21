import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any[];
  constructor(public sideBarService: SidebarService) {
    this.menu = this.sideBarService.menu;
    console.log('el servicio es ', this.menu);

   }

  ngOnInit() {
  }

}
