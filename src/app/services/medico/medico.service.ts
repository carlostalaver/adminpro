import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(private http: HttpClient) { }

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
}
