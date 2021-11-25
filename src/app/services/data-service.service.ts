import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDespesa } from '../Interfaces/IDeputados';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private despesaSource = new BehaviorSubject('');
  private projetoSource = new BehaviorSubject('');
  private ultDespesaSource = new BehaviorSubject('');
  currentDespesa = this.despesaSource.asObservable();
  currentProjeto = this.projetoSource.asObservable();
  currentUltDespesa = this.ultDespesaSource.asObservable();
  constructor() {}

  changeDespesa(despesa: any) {
    this.despesaSource.next(despesa);
  }

  changeProjeto(projeto: any) {
    this.projetoSource.next(projeto);
  }

  changeUltDespesa(ultDespesa: any) {
    this.ultDespesaSource.next(ultDespesa);
  }
}
