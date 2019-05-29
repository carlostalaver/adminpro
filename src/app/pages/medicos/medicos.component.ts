import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

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
        console.log('la respuesta de los medicos es :', res);
        this.medicos = res.medicos;
        this.totalMedicos = res.totalRegistros;
      });
  }

  buscarMedico(value: string) {

  }

  crearMedico() {

  }

  editarMedico(medico: Medico) {

  }

  borrarMedico(medico: Medico){

  }
}
