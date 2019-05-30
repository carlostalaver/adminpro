import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalMedicos = 0;

  constructor(private medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedico()
      .subscribe((res: any) => {
        this.medicos = res.medicos;
        this.totalMedicos = res.totalRegistros;
      });
  }

  buscarMedico(value: string) {
    if (value.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoService.buscarMedico(value)
      .subscribe( res => {
        this.medicos = res!.medicos;
        console.log('los medicos encontrados son: ', this.medicos);

      });
  }

  borrarMedico(medico: Medico) {
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
        this.medicoService.borrarMedico(medico._id)
          .subscribe(res => {
            Swal.fire(
              'Eliminado!',
              `El médico ${res.medico.nombre} ha sido eliminado.`,
              'success'
            );
            this.cargarMedicos();
          });
      }
    });
  }
}
