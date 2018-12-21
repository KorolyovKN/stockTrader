import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Market } from '../../models/market';

@Component({
  selector: 'app-markets-list',
  templateUrl: './markets-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsListComponent implements OnInit {

  @Input() markets: Market[];
  @Input() pending: boolean;
  @Input() error: string | null;
  @Input() categories: Array<string>;

  @Output() purchased = new EventEmitter<Object>();
  @Output() changedCategory = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  onPurchase(market, quantity) {
    this.purchased.emit({market: market, quantity: quantity});
  }
  changeCategory($event) {
    this.changedCategory.emit($event);
  }
}
