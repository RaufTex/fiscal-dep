import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardultdespesa',
  templateUrl: './cardultdespesa.component.html',
  styleUrls: ['./cardultdespesa.component.css'],
})
export class CardultdespesaComponent implements OnInit {
  @Input() ultDespesa: any;

  constructor() {}

  ngOnInit(): void {}
}
