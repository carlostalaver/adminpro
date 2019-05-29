import { Injectable } from '@angular/core';
import { URL_SERVICES } from './../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string): Promise<any> {

    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      // configuracion d ela peticion ajax
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if ( xhr.status === 200) {
              console.log('Imagen subida');
              resolve(JSON.parse( xhr.response));
            } else {
              console.log('Falló la subida');
              reject(JSON.parse( xhr.response));
            }
          }
      };

      const URL = `${URL_SERVICES}/upload/${tipo}/${id}`;

      xhr.open('PUT', URL, true);
      xhr.send(formData);
    });

  }
}
