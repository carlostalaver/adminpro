import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {

    let URL = `${URL_SERVICES}/img`;

    if (!imagen) {
      return URL + '/usuario/noimage';
    }

    // verificar si se un imagen de google
    if( imagen.indexOf('https') >= 0) {
      return imagen;
    }


    switch (tipo) {
      case 'usuario':
        URL += '/usuarios/' + imagen;
        break;
      case 'medico':
        URL += '/medicos/' + imagen;
        break;
      case 'hospital':
        URL += '/hospitales/' + imagen;
        break;
      default:
        console.log('Tipo de imagen no existe, los validos: medicos, usuarios u hospitales');
        URL += '/usuarios/noimgen';

    }

    return URL;
  }

}
