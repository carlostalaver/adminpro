import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progresoAzul: number = 20;
  progresoVerde: number = 40;

  leyendaAzul: string = 'Progress Azul';
  leyendaVerde: string = 'Progress Verde';
  constructor() { }

  ngOnInit() {
  }

  actualizar(value: number) {
    this.progresoAzul = value;
  }
}
