import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];


  constructor(public hospitalService: HospitalService, private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe( res => {
      this.cargarHospitales();
    })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((res: any) => {
        this.hospitales = res.hospitales;
      },
      (err) => {
        console.log('ocurrio un error al cargar los hospitales... ', err);
      });
  }

  buscarHospital(value: string) {

    if (value.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital(value)
      .subscribe((rs: any) => {
          this.hospitales = rs.hospitales;

      });

  }

  guardarHospital(hospital: Hospital) {
    console.log('actualizar hospital ', hospital );
    this.hospitalService.actualizarHospital(hospital)
      .subscribe( res => {
        console.log('actualizado el hospital ', res);

      });
  }

  borrarHospital(hospital: Hospital) {

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
        this.hospitalService.borrarHospital(hospital._id)
        .subscribe(res => {
          Swal.fire(
            'Eliminado!',
            `El Hospital ha sido eliminado.`,
            'success'
          );
          this.cargarHospitales();
        });
      }
    });
  }

  async crearHospital(nombre: string) {
    const {value: ipAddress} = await Swal.fire({
      title: 'Nombre del Hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        console.log('el value es ', value);

        if (!value || value.length === 0) {
          return 'Necesitas introducir el nombre del hospital!';
        }

        this.hospitalService.crearHospital(value)
          .subscribe(res => {
            this.cargarHospitales();
          });

      }
    })
  }

  actualizarImagen(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
