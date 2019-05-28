import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario = null;

  menu: any[];
  constructor(public sideBarService: SidebarService, public usuarioService: UsuarioService) {
    this.menu = this.sideBarService.menu;
   }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
