import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;
  token: string = null;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.token = localStorage.getItem('token');
   }

  cargarHospitales(inicio: number = 0): Observable<any> {
    const URL = `${URL_SERVICES}/hospital?inicio=${inicio}`;
    return this.http.get(URL)
      .pipe(
        map((res: any) => {
          this.totalHospitales = res.totalRegistros;
          return res;
        })
      );
  }

  obtenerHospital(id: string): Observable<any> {
    const URL = `${URL_SERVICES}/hospital/${id}`;
    return this.http.get(URL);
  }

  borrarHospital(id: string) {
    const URL = `${URL_SERVICES}/hospital/${id}?token=${this.token}`;
    return this.http.delete(URL)
      .pipe(
        map(res => {

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
              Swal.fire(
                'Eliminado!',
                `El Hospital ha sido eliminado.`,
                'success'
              );

            }
          });
          return res;
        })
      );
  }

  crearHospital(nombre: string) {
    const URL = `${URL_SERVICES}/hospital?token=${this.usuarioService.token}`;

    return this.http.post(URL, {nombre});
  }

  buscarHospital(valor: string) {
    const URL = `${URL_SERVICES}/busqueda/coleccion/hospitales/${valor}`;

    return  this.http.get(URL);
  }

  actualizarHospital(hospital: Hospital) {
    const URL = `${URL_SERVICES}/hospital/${hospital._id}?token=${this.usuarioService.token}`;
    return this.http.put(URL, hospital)
      .pipe(
        map( (res: any) => {
            Swal.fire('Hospital Actualizado', `${res.hospital.nombre}`, 'success');
            return res;
        })
      );
  }

}// end class
