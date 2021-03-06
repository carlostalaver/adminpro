import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private route: Router) {}

  canActivate( ): boolean {
    if (!this.usuarioService.estaLogueado()){
      console.log('No estoy logueado');

      this.route.navigate(['/login']);
    } else {
      return this.usuarioService.estaLogueado();
    }
  }

}
