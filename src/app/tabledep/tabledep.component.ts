import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { DialogDataExample } from '../dialoginfo/dialoginfo.component';
import {
  IDeputado,
  IDeputadoAll,
  IEvento,
  IProjeto,
  IProjetos,
} from '../Interfaces/IDeputados';
import { DeputadoService } from '../services/deputado.service';
import { lastValueFrom, Subject } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { DataService } from '../services/data-service.service';
import { Subscription } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tabledep',
  templateUrl: './tabledep.component.html',
  styleUrls: ['./tabledep.component.css'],
})
export class TabledepComponent implements OnInit, OnDestroy {
  private listReady = new Subject();
  deputados: IDeputado[] = [];
  projetos: IProjetos[] = [];
  projetos2: IProjetos[] = [];
  projetos3: IProjetos[] = [];
  projetosFull: IProjetos[] = [];
  projetoTeste: any;
  deputadosInfo: any;
  eventos: any;
  despesas: any;
  conc: any;
  arrayNextEvent: any;
  subscription: Subscription;
  subscriptionUltDespesa: Subscription;
  masculino: any;
  ultimaDespesa: any;

  filtro: string = '';

  @Input() type = 'search';
  @Input() id: number;
  @Input() slice = 10;

  constructor(
    public depservice: DeputadoService,
    public dialog: MatDialog,
    public dialogevent: MatDialog,
    private despesa: DataService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionUltDespesa.unsubscribe();
  }

  ngOnInit(): void {
    this.getDeputados();
    this.getProjetos();

    this.subscription = this.despesa.currentDespesa.subscribe(
      (despesa) => (this.despesas = despesa)
    );

    this.subscriptionUltDespesa = this.despesa.currentUltDespesa.subscribe(
      (ultDespesa) => (this.ultimaDespesa = ultDespesa)
    );

    //this.getDeputadosAll(this.id);
    //throw new Error('Method not implemented.');
  }

  static emitirEventos = new EventEmitter<IEvento>();

  onClickInfo(id: number) {
    console.log(id);
    this.getDeputadosAll(id);
    console.log(this.dialog);
  }

  getMasculino() {
    this.depservice.obterMasculino().subscribe((data) => {
      this.deputados = data.dados;
      console.log(this.deputados);
    });
  }

  getFeminino() {
    this.depservice.obterFeminino().subscribe((data) => {
      this.deputados = data.dados;
      console.log(this.deputados);
    });
  }

  openDialog(id: number) {
    this.getDeputadosAll(id);
    this.getEventos(id);
    this.getDespesas(id);

    /* this.dialog.open(DialogDataExample, {
      data: this.deputadosInfo,
    }); */
    setTimeout(() => {
      this.conc = this.deputadosInfo.concat(this.eventos);
      console.log(this.conc);
      this.dialog.open(DialogDataExample, {
        data: this.conc,
      });
    }, 1100);
  }

  getDeputados() {
    this.depservice.obterDeputados().subscribe((data) => {
      this.deputados = data.dados;
      console.log(this.deputados.length);
    });
  }

  getProjetos() {
    forkJoin({
      dados: this.depservice.obterProjetos(523),
      dados1: this.depservice.obterProjetos(524),
      dados2: this.depservice.obterProjetos(525),
    }).subscribe((data) => {
      this.projetos = data.dados.dados;
      this.projetos2 = data.dados1.dados;
      this.projetos3 = data.dados2.dados;
    });

    console.log(this.projetos);

    setTimeout(() => {
      this.projetosFull = this.projetos
        .concat(this.projetos2)
        .concat(this.projetos3);
      console.log(this.projetosFull);
    }, 2100);
  }

  getProjeto() {
    let i: number = 0;
    this.projetosFull.map((projeto) =>
      forkJoin({ dados: this.depservice.obterProjeto(projeto.id) }).subscribe(
        (data) => {
          this.projetoTeste = data.dados.dados;
          console.log(this.projetoTeste);
        }
      )
    );
  }

  getDeputadosAll(id: number) {
    //lastValueFrom;
    this.depservice.obterDeputadosInfo(id).subscribe((data) => {
      this.deputadosInfo = Object.values(data).splice(0, 1);
      console.log(this.deputadosInfo);
    });

    //console.log(this.variaTeste.length);
  }

  getEventos(id: number) {
    //lastValueFrom;
    this.depservice.obterEventos(id).subscribe((data) => {
      this.eventos = data.dados.filter(
        (data: { dataHoraFim: null }) => data.dataHoraFim != null
      );
      console.log(this.eventos);
      this.arrayNextEvent = data.dados
        .sort((a: any, b: any) => a.dataHoraInicio - b.dataHoraInicio)
        .filter((data: { dataHoraFim: null }) => data.dataHoraFim === null);
      console.log(this.arrayNextEvent);
    });

    //TabledepComponent.emitirEventos.emit(this.eventos);
    //console.log(this.variaTeste.length);
  }

  getDespesas(id: number) {
    this.depservice.obterDespesas(id).subscribe((data) => {
      this.despesas = data.dados;
      this.ultimaDespesa = data.dados;
      setTimeout(() => {
        this.despesa.changeDespesa(this.despesas);
        this.despesa.changeUltDespesa(this.ultimaDespesa);

        //this.despesas.emit(this.despesas);
      }, 1000);
      console.log(this.despesas);
    });
    this.depservice.obterDespesasMaior(id).subscribe((data) => {
      this.ultimaDespesa = data.dados;
      setTimeout(() => {
        this.despesa.changeUltDespesa(this.ultimaDespesa);

        //this.despesas.emit(this.despesas);
      }, 1000);
      console.log(this.ultimaDespesa);
    });
  }

  loadMore() {
    this.slice += 10;
  }

  /* open() {
    this.dialog.open(DialogDataExample, {
      data: this.deputadosInfo,
    });
  } */

  displayedColumns: string[] = [
    'urlFoto',
    'nome',
    'siglaPartido',
    'siglaUf',
    'info',
  ];
}
