import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface IAjustes {
  temaURL: string;
  tema: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: IAjustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema,
    this.ajustes.temaURL = url;
    this.guardarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

}
