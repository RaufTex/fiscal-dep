import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeputadoAll } from '../Interfaces/IDeputados';
import { DeputadoService } from '../services/deputado.service';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data-service.service';
import { Subscription } from 'rxjs';

registerLocaleData(localePT);
/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialoginfo.component.html',
  styleUrls: ['./dialoginfo.component.css'],
})
export class DialogDataExample implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IDeputadoAll[],
    private req: DeputadoService,
    private route: ActivatedRoute,
    private router: Router,
    private desp: DataService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionProj.unsubscribe();
    this.subscriptionUltDespesa.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.desp.currentDespesa.subscribe(
      (despesa) => (this.despesas = despesa)
    );
    this.subscriptionUltDespesa = this.desp.currentUltDespesa.subscribe(
      (ultimaDespesa) => (this.ultimaDespesa = ultimaDespesa)
    );
    this.subscriptionProj = this.desp.currentProjeto.subscribe(
      (projeto) => (this.projetos = projeto)
    );
  }
  ultimaDespesa: any;

  despesas: any;
  projetos: any;
  subscription: Subscription;
  subscriptionProj: Subscription;
  subscriptionUltDespesa: Subscription;

  dataAni = new Date();

  @Input() id: number;
  @Input() eventos: any;

  openDespesas(id: any) {
    this.req.obterDespesas(id).subscribe((data) => {
      this.despesas = data.dados;
      console.log(this.despesas);
    });
    setTimeout(() => {
      this.desp.changeDespesa(this.despesas);
      console.log(this.ultimaDespesa);
      this.router.navigate(['alldespesas']);
    }, 1000);
  }

  openProjetos(id: any) {
    this.req.obterProjetos(id).subscribe((data) => {
      this.projetos = data.dados;
      console.log(this.projetos);
    });
    setTimeout(() => {
      this.desp.changeProjeto(this.projetos);
      //this.despesas.emit(this.despesas);
      this.router.navigate(['allprojetos']);
    }, 1000);
  }
}
