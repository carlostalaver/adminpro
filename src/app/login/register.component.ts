import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

declare var swal: any;
declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(private usuarioService: UsuarioService, private route: Router) {

  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@gmaul.com',
      password: '123',
      password2: '123',
      condiciones: true
    });
  }

  sonIguales(campo1: string, campo2: string): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const password1 = (c as FormGroup).controls[campo1].value;
      const password2 = (c as FormGroup).controls[campo2].value;
      if (password1 === password2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }


  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire(
        'Importante ',
        'Debe aceptar los terminos y condiciones',
        'warning'
      );
      /* Usando sweetAlert version 1
       swal('Importante 2', 'Las condiciones deben ser aceptadas', 'warning');*/

    }
    const usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.email,
        this.forma.value.password

      );

    this.usuarioService.crearUsuario(usuario).subscribe(res => {
      this.route.navigate(['/login']);
    },
    (err) => {
      console.log('Ocurrio un error ', err);

    });
  }
}

