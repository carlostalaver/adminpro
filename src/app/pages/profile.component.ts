import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { UsuarioService } from '../services/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  currenUser: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(private usuarioService: UsuarioService) {
    this.currenUser = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    this.currenUser.nombre = forma.value.nombre;

    if (!this.usuarioService.usuario.google) {
      this.currenUser.email = forma.value.email;
    }

    this.usuarioService.actualizarUsuario(this.currenUser)
      .subscribe((res) => {
        Swal.fire(`Actualización de usuario`, `el usuario ${this.currenUser.nombre} ha sido actualizado`, 'success')
      }, (err) => {
        console.log(' Ocurrio un error al actualizar usuario ', err);
      });
  }

  seleccionImagen(event) {

    if (!event.target.files[0]) {
      this.imagenSubir = null;
      return;
    }

    if (event.target.files[0].type.indexOf('image') < 0) {
      Swal.fire('Importante', 'Solo puede sobir imagenes', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = event.target.files[0];

    //#region javaScritp pure usado para cargar la imagen como preview

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    console.log('el obj reader ', reader  );

    /* onloadend--> Un controlador para el evento loadend. Este evento se activa cada
     vez que  la operación de lecura se ha completado (ya sea con éxito o fallo).
     https://www.javascripture.com/FileReader
   */
    reader.onloadend = () => this.imagenTemp = reader.result;

    //#endregion

  }

  cambiarImagen() {
     this.usuarioService.cambiarImagen(this.imagenSubir, this.currenUser._id);
  }



}
