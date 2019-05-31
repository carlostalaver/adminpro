import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.models';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.buscar(params['termino']);
    });

  }

  buscar(termino: string) {
    const URL = `${URL_SERVICES}/busqueda/todo/${termino}`;
    this.http.get(URL).subscribe( (res: any) => {
      this.medicos = res.medicos;
      this.usuarios = res.usuarios;
      this.hospitales = res.hospitales;

      console.log('la busqyeda es medicos-....', this.medicos);
    });
  }

}
