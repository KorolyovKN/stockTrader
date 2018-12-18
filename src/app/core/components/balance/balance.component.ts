import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {
  @Input() userBalance: number;

  constructor() { }

  ngOnInit() {
  }

}
