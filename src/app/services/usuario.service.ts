import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './../config/config';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {


  usuario: Usuario;
  token: string;


  constructor(private http: HttpClient, private subirArService: SubirArchivoService) {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse( localStorage.getItem('usuario'));
  }

  estaLogueado() {
    return !!this.token;
  }

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

  actualizarUsuario(usuarioActualizado: Usuario): Observable<any> {
    const URL = `${URL_SERVICES}/usuario/${usuarioActualizado._id}?token=${this.token}`;

    return this.http.put(URL, usuarioActualizado)
      .pipe(
        map((res: any) => {

          if(usuarioActualizado._id === this.usuario._id){
            const userDB = res.usuario;
            this.guardarStorage(userDB._id, userDB.token, userDB);
          }
          return res;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
      this.subirArService.subirArchivo(archivo, 'usuarios', id)
        .then( (res: any) => {
          this.usuario.img = res.usuario.img;
          Swal.fire('Imagen actualizada', 'La imagen ha sido actualizada con exito', 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch(err => {
          console.log(err);
        });
  }

  cargarUsuarios( inicio: number = 0) {
    const URL = `${URL_SERVICES}/usuario?inicio=${inicio}`;

    return this.http.get(URL);
  }

  buscarUsuario(valor: string) {
    const URL = `${URL_SERVICES}/busqueda/todo/${valor}`;

    return  this.http.get(URL);
  }

  eliminarUsuario(id: string) {
    const URL = `${URL_SERVICES}/usuario/${id}?token=${this.token}`;

    return this.http.delete(URL);
  }



}
