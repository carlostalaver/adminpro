import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario = null;
  constructor( public usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this.usuarioService.usuario;
  }

}
