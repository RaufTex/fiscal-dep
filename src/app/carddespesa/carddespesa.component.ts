import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { IDespesa } from '../Interfaces/IDeputados';

@Component({
  selector: 'app-carddespesa',
  templateUrl: './carddespesa.component.html',
  styleUrls: ['./carddespesa.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class CarddespesaComponent implements OnInit {
  @Input() despesas: any;

  constructor() {}

  ngOnInit(): void {}
}
