import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string ;


  constructor(private subirArService: SubirArchivoService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

    reader.onloadend = (e) => this.imagenTemp = reader.result.toString();

    //#endregion

  }

  subirImagen() {
    console.log('--> subiendo la imagen');

    this.subirArService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( res => {
        this.modalUploadService.notificacion.emit(res);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Ocurrió un error al subir la imagen...', err);
      });
  }

  cerrarModal() {
    this.imagenTemp = void 0;
    this.imagenSubir = void 0;
    this.modalUploadService.ocultarModal();
  }

 }
