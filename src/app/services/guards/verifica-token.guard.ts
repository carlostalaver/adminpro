import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
payload: any = null;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    const token = this.usuarioService.token;
    this.payload = JSON.parse(atob(token.split('.')[1]));
    console.log('inicio de verificacion de token ', this.payload);
      // return true;
    const expiro = this.expirado(this.payload['exp']);

    if ( expiro) {
      this.router.navigate(['/login']);
      return false;
    } else {
        return this.verificaRenueva(this.payload.exp);
    }

  }

  expirado(fechaExp: number): boolean {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise((resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000); // por 1000 xq necesito es milisegundo no segundos
      const ahora = new Date();

      // incremento en 4 hora la hora actual

      console.log(tokenExp);
      console.log(ahora);

      ahora.setTime(ahora.getTime() + (3 * 60 * 60 * 1000)); // 4 horas, 60 min, 60 seg, 1000 milis
      console.log(ahora);

      if (tokenExp.getTime() > ahora.getTime()){
        console.log('fecha de exp mayo');
        resolve(true);
      } else {
          this.usuarioService.renovarToken().subscribe( res => {
            resolve(true);
          },
          (err) => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }


    });
  }

}
