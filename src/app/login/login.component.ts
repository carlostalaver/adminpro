import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit() {
    /* Funcion que yo cree en el archivo custom.js, lo que hace es llamar a todos los inicializadores
       de los plugin de la aplicacion, notas en el video clase 64 seccion 7 */
    init_plugins();
  }

  ingresar() {
    this.router.navigate(['/dashboard']);
  }
}
