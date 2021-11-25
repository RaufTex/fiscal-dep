import { Component, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDespesa } from '../Interfaces/IDeputados';
import { DataService } from '../services/data-service.service';

/**
 * @title Sorting overview
 */
@Component({
  selector: 'app-tabledesp',
  templateUrl: './tabledesp.component.html',
  styleUrls: ['./tabledesp.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class TabledespComponent implements OnInit, OnDestroy {
  despesa: any;
  subscription: Subscription;
  filtro: string = '';
  @Input() slice = 10;

  sortedData: IDespesa[];

  constructor(private data: DataService, private router: Router) {
    setTimeout(() => {
      this.sortedData = this.despesa.slice();
      console.log(this.sortedData);
    }, 1000);
  }
  ngOnInit(): void {
    this.subscription = this.data.currentDespesa.subscribe(
      (despesa) => (this.despesa = despesa)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMore() {
    this.slice += 10;
  }

  goBack() {
    this.router.navigate(['']);
  }

  sortData(sort: Sort) {
    const data = this.despesa.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      console.log(this.sortedData);
      return;
    }

    this.sortedData = data.sort(
      (
        a: {
          tipoDespesa: string | number;
          nomeFornecedor: string | number;
          valorDocumento: string | number;
          dataDocumento: string | number;
          urlDocumento: string | number;
        },
        b: {
          tipoDespesa: string | number;
          nomeFornecedor: string | number;
          valorDocumento: string | number;
          dataDocumento: string | number;
          urlDocumento: string | number;
        }
      ) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'tipoDespesa':
            return compare(a.tipoDespesa, b.tipoDespesa, isAsc);
          case 'nomeFornecedor':
            return compare(a.nomeFornecedor, b.nomeFornecedor, isAsc);
          case 'valorDocumento':
            return compare(a.valorDocumento, b.valorDocumento, isAsc);
          case 'dataDocumento':
            return compare(a.dataDocumento, b.dataDocumento, isAsc);
          case 'urlDocumento':
            return compare(a.urlDocumento, b.urlDocumento, isAsc);
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

