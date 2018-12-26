import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {Portfolio} from '../../../shared/models/portfolio';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosListComponent implements OnInit {

  @Input() portfolios: Portfolio[];
  @Input() pending: boolean;
  @Input() error: string | null;

  @Output() selling = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }
  onSell(portfolio, quantity) {
    this.selling.emit({portfolio: portfolio, quantity: quantity});
  }

}
