import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
              public setservice: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(tema: string, link: ElementRef) {
    this.aplicarCheck(link);
    this.setservice.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    const selectores: any = this._document.getElementsByClassName('selector');
    for (const select of selectores) {
      select.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck()  {
    const selectores: any = this._document.getElementsByClassName('selector');
    for (const select of selectores) {
      if (select.getAttribute('data-theme') === this.setservice.ajustes.tema) {
        select.classList.add('working');
        break;
      }
    }
  }
}
