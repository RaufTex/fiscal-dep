import { Component, Input, OnInit } from '@angular/core';
import { IEvento } from '../Interfaces/IDeputados';

@Component({
  selector: 'app-cardevent',
  templateUrl: './cardevent.component.html',
  styleUrls: ['./cardevent.component.css'],
})
export class CardeventComponent implements OnInit {
  @Input() events: any;

  constructor() {}

  data1 = new Date();

  ngOnInit(): void {}
}
