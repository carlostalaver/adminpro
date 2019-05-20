import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


  @Input() progreso: number;
  @Input('leyendaComponenteHijo') leyenda: string;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('txtProgress') txtProgess: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    /*const elemHTML: any = document.getElementsByName('progreso')[0];
    console.log(' elemHTML ', elemHTML.value);*/

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgess.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {

    this.onChanges(valor)
    if (this.progreso === 0 && valor < 0) {
      return;
    }
    if (this.progreso >= 100 && valor > 0) {
      return;
    }
    if ( this.progreso >= 0 && this.progreso <= 100) {
      this.progreso = this.progreso + valor;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgess.nativeElement.focus();
  }


}
