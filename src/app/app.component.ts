import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { API_PATH } from 'src/environments/environment';
import { IDeputado } from './Interfaces/IDeputados';
import { DeputadoService } from './services/deputado.service';

const urlBase = 'https://dadosabertos.camara.leg.br/api/v2';

/* interface IDeputados {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
} */
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: IDeputado[] = [
  { urlFoto: '1', nome: 'Hydrogen', siglaPartido: '1.0079', siglaUf: 'H' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //deputadosTeste: IDeputado[] = [];
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //console.log(value);

  /* obterDeputados() {
    this.deputadoService.obterTodos().then((dados) => console.log(dados));
  } */
  //displayedColumns: string[] = ['urlFoto', 'nome', 'siglaPartido', 'siglaUf'];

  //dataSource = ELEMENT_DATA;

  title = 'fiscal-dep';
}
