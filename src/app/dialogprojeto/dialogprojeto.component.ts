import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProjeto } from '../Interfaces/IDeputados';
import { DeputadoService } from '../services/deputado.service';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data-service.service';
import { Subscription } from 'rxjs';

registerLocaleData(localePT);

@Component({
  selector: 'app-dialogprojeto',
  templateUrl: './dialogprojeto.component.html',
  styleUrls: ['./dialogprojeto.component.css'],
})
export class DialogProjetoComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IProjeto[],
    private req: DeputadoService,
    private route: ActivatedRoute,
    private router: Router,
    private desp: DataService
  ) {}
}
