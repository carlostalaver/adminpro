import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  inicio: number = 0;
  fin: number = 0;
  totalRegistro: number = 0;
  cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarRegistro();
    this.modalUploadService.notificacion.subscribe((res => {
      this.cargarRegistro();
    }), (err) => {
      console.log('Ocurrió un error al refrescar la lista de usuarios...', err);

    });
  }

  cargarRegistro() {
    this.usuarioService.cargarUsuarios(this.inicio)
      .subscribe( (res: any) => {
        this.totalRegistro = res.totalRegistros;
        this.usuarios = res.usuarios;
        setTimeout(() => {
          this.cargando = false;

        }, 1000);
      });
  }

  cambiarInicio(valor: number) {
    const inicio = this.inicio + valor;

    if (inicio > this.totalRegistro) {
      return;
    }

    if (inicio < 0) {
      return;
    }

    this.inicio += valor;
    this.cargarRegistro();

  }

  buscarUsuario(value: string) {
    if (value.length <= 0){
      this.cargarRegistro();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(value)
      .subscribe( (res: any) => {
        this.usuarios  = res.usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    console.log('borrando usuario ', usuario);
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('Error', 'No se puede borrar usuario', 'error');
      return;
    }

    Swal.fire({
      title: '¿ Estas seguro(a) ?',
      text: "Esta acción no puede ser revertida",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario._id)
          .subscribe((res: any) => {
            Swal.fire(
              'Eliminado!',
              `El usuario ${res.usuario.nombre} ha sido eliminado.`,
              'success'
            );

            this.cargarRegistro();
          });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {

    this.usuarioService.actualizarUsuario(usuario)
      .subscribe((res: any) => {
        console.log(' res del server ', res);

      });
  }


  mostartModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
}
