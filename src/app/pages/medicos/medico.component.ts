import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico = new Medico('', '', '', '', '');

  constructor(private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private router: Router,
              private route: ActivatedRoute,
              private modalUploadservice: ModalUploadService) { }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
      .subscribe(res => {
        this.hospitales = res!.hospitales;
      });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (+id === 0) {
        return;
      }

      this.medicoService.buscarMedicoId(id).subscribe((res: any) => {

        console.log('en el ngOnInit ', res);

        this.medico.nombre = res.medico.nombre;
        this.medico.img = res.medico.img;
        this.medico.usuario = res.medico.usuario._id;
        this.medico.hospital = res.medico.hospital._id;
        this.medico._id = res.medico._id;

        this.hospital.nombre = res.medico.hospital.nombre;
        this.hospital._id = res.medico.hospital._id;
        this.hospital.img = res.medico.hospital.img;
     });

    });



    this.modalUploadservice.notificacion.subscribe( res => {
      this.medico.img = res.medico.img;
    });

  }


  guardarMedico(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
      .subscribe(res => {
        this.medico._id = res.medico._id;
        Swal.fire('Médico', `${res.medico.nombre} ha sido guardado!`, 'success');
        this.router.navigate(['/medico', res.medico._id]);
      });
  }

  cambiarHospital(evento) {
   this.hospitalService.obtenerHospital(evento.target.value)
      .subscribe(res => {
        this.hospital = res.hospital;
      });
  }


  cambiarFoto() {
    this.modalUploadservice.mostrarModal('medicos', this.medico._id);
  }


}
