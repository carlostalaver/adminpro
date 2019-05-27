import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './../config/config';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  get estaLogueado() {
    return !!this.token;
  }

  constructor(private http: HttpClient) {}

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const URL = URL_SERVICES + '/login';
    return this.http.post(URL, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.usuario._id, res.token, res.usuario);
        return true;
      })
    );
  }

  loginGoogle(tokenGoogle: string): Observable<any>{
    const URL = URL_SERVICES + '/login/google';

    return this. http.post(URL, { token: tokenGoogle}).pipe(
      map( (res: any) => {
        this.guardarStorage(res.usuario._id, res.token, res.usuario);
        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const URL = URL_SERVICES + '/usuario';

    return this.http.post<any>(URL, usuario).pipe(
       tap( res => {}),
       map((user: any) => {

          // tslint:disable-next-line:no-string-literal
          Swal.fire(`Usuario ${user['usuario']['email']} creado`, 'success');
          return user;
        })
      );
  }


  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    window.location.href = '#login';
  }
}
