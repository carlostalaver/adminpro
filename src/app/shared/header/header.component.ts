import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario = null;
  constructor( public usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {

    this.usuario = this.usuarioService.usuario;
  }

  buscar(value: string) {
    this.router.navigate(['/busqueda', value]);
  }

}
