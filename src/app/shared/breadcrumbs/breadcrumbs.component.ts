import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta,  MetaDefinition} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  data: {[key: string]: string};

  constructor(public route: Router,
              private titleService: Title,
              private meta: Meta) {
    this.getDataRoute().subscribe( event => {
      this.data = event;
      this.titleService.setTitle(this.data.titulo || 'Adminpro');
      const metaTags: MetaDefinition = {
        name: `Descripcion personalizada para ${this.data.titulo}`,
        content: this.data.titulo
      };
      this.meta.updateTag(metaTags);
    });

   }

  ngOnInit() {
    this.getDataRoute();
  }

  getDataRoute(): Observable<{[key: string]: string}> {
    return this.route.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map((event: ActivationEnd ) => event.snapshot.data)
    );

  }

}
