import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  tipo: string = null; // si es un medico, un usuario o un hospital
  id: string = null; // el id del tipo id_medico, id_usuario, id_hospital
  oculto: string = 'oculto';

  notificacion = new EventEmitter<any>(true);

  constructor() {}

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

    console.log(`los valores de id es ${id} tipo ${tipo}`);

  }
}
