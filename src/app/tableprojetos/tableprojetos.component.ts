import { Component, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogProjetoComponent } from '../dialogprojeto/dialogprojeto.component';
import { IDespesa, IProjetos } from '../Interfaces/IDeputados';
import { DataService } from '../services/data-service.service';
import { DeputadoService } from '../services/deputado.service';

@Component({
  selector: 'app-tableprojetos',
  templateUrl: './tableprojetos.component.html',
  styleUrls: ['./tableprojetos.component.css'],
})
export class TableprojetosComponent implements OnInit, OnDestroy {
  projeto: any;
  detalhesProjeto: any;
  subscription: Subscription;
  filtro: string = '';
  @Input() slice = 5;

  sortedData: IProjetos[];

  constructor(
    public projetoservice: DeputadoService,
    private data: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    setTimeout(() => {
      this.sortedData = this.projeto.slice();
      console.log(this.sortedData);
    }, 1000);
  }

  openDialog(id: number) {
    this.getProjeto(id);

    /* Injetando os dados do projeto selecionado */
    setTimeout(() => {
      this.dialog.open(DialogProjetoComponent, {
        data: this.detalhesProjeto,
      });
    }, 1100);
  }
  ngOnInit(): void {
    this.subscription = this.data.currentProjeto.subscribe(
      (projeto) => (this.projeto = projeto)
    );
  }

  getProjeto(id: number) {
    //lastValueFrom;
    this.projetoservice.obterProjeto(id).subscribe((data) => {
      this.detalhesProjeto = Object.values(data);
      console.log(this.detalhesProjeto);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMore() {
    this.slice += 5;
  }

  goBack() {
    this.router.navigate(['']);
  }

  sortData(sort: Sort) {
    const data = this.projeto.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      console.log(this.sortedData);
      return;
    }

    this.sortedData = data.sort(
      (
        a: {
          numero: string | number;
          ano: string | number;
          ementa: string | number;
        },
        b: {
          numero: string | number;
          ano: string | number;
          ementa: string | number;
        }
      ) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'numero':
            return compare(a.numero, b.numero, isAsc);
          case 'ano':
            return compare(a.ano, b.ano, isAsc);
          case 'ementa':
            return compare(a.ementa, b.ementa, isAsc);
          default:
            return 0;
        }
      }
    );
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
