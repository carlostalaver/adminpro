import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  cargarMedico(inicio: number = 0): Observable<any> {
    const URL = `${URL_SERVICES}/medico?inicio=${inicio}`;
    return this.http.get(URL)
      .pipe(
        map((res: any) => {
          this.totalMedicos = res.totalRegistros;
          return res;
        })
      );
  }

  buscarMedico(valor: string): Observable<any> {
    const URL = `${URL_SERVICES}/busqueda/coleccion/medicos/${valor}`;

    return  this.http.get(URL);
  }

  borrarMedico(id: string): Observable<any> {
    const URL = `${URL_SERVICES}/medico/${id}/?token=${this.usuarioService.token}`;
    return this.http.delete(URL);
  }

  guardarMedico(medico: Medico): Observable<any> {
    if (medico._id) {
      const URL = `${URL_SERVICES}/medico/${medico._id}?token=${this.usuarioService.token}`;
      return this.http.put(URL, medico);
    } else {
      const URL = `${URL_SERVICES}/medico?token=${this.usuarioService.token}`;
      return this.http.post(URL, medico);
    }

  }

  buscarMedicoId(id: string) {
    const URL = `${URL_SERVICES}/medico/${id}`;
    return this.http.get(URL);

  }

}
