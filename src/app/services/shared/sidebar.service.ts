import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any;
/*  el menu lo cargo desde el servidor
 menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
         {titulo: 'Usuarios', url: '/usuarios'},
         {titulo: 'Hospitales', url: '/hospitales'},
         {titulo: 'Medicos', url: '/medicos'},
      ]
    }
  ]; */
  constructor( private usuarioService: UsuarioService) {
    this.menu = this.usuarioService.menu;
   }

}
