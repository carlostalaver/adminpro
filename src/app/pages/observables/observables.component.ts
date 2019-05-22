import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styles: []
})
export class ObservablesComponent implements OnInit {

  constructor() {
    console.log('Subscribiendome');

    this.rxjs().subscribe((valor) => {console.log('El valor es ', valor);},
    (err) => {console.log('Ocurrio un error ', err);},
    () => console.log('Completado'));
   }

  ngOnInit() {
  }

  rxjs(): Observable<number> {
    return new Observable( observer => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
            clearInterval(intervalo);
            observer.complete();
        }

        if (contador === 2) {
            observer.error('ERORR OBSERVABLE');
        }
      });
    });
  }

}
