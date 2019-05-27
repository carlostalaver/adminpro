import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.models';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;

  constructor(private router: Router, private serviceUser: UsuarioService ) {
   }

  ngOnInit() {
    /* Funcion que yo cree en el archivo custom.js, lo que hace es llamar a todos los inicializadores
       de los plugin de la aplicacion, notas en el video clase 64 seccion 7 */
    init_plugins();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  //#region para la utenticacion con Google
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '704176601594-6qp7ms10icvi5el4ahe1dgnpruin6sb5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' // la informacion que necesito de google es el profile y el email

      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element: HTMLElement) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // Obteniendo el profile
      // const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;
      // console.log('El profile de google es ', token);

      this.serviceUser.loginGoogle(token)
          .subscribe(res => {
            console.log('la respuesta desde el token google ', res);
           // this.router.navigate(['/dashboard']); usando este metodo da una especie de error al cargar el template del dashboard

            window.location.href = '#/dashboard'; // usando javaScript pure
          });
    });
  }
 //#endregion token con google

  ingresar(f: NgForm) {

    if (f.invalid) {
      return;
    }
    const usuario = new Usuario(null, f.value.email, f.value.password);

    this.serviceUser.login(usuario, this.recuerdame).subscribe(res => {
         this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log('ocurrio un error ', err);

    });


    /* this.router.navigate(['/dashboard']); */
  }
}
