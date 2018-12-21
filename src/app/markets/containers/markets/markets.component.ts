import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as MarketsActions from '../../actions/markets.actions';
import * as fromMarkets from '../../reducers';
import {LoadListPayload, Filters} from '../../../shared/models/list';
import {Portfolio} from '../../../shared/models/portfolio';
import {id} from '../../../shared/utils/id';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html'
})
export class MarketsComponent implements OnInit {

  markets$ = this.store.pipe(select(fromMarkets.getMarkets));
  pending$ = this.store.pipe(select(fromMarkets.getMarketsPending));
  error$ = this.store.pipe(select(fromMarkets.getMarketsError));
  count$ = this.store.pipe(select(fromMarkets.getMarketsCount));
  categories$ = this.store.pipe(select(fromMarkets.getMarketsCategories));


  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new MarketsActions.LoadMarkets());
    this.store.dispatch(new MarketsActions.LoadMarketsCategories());
  }

  onPushase($event) {
    const portfolio: Portfolio = {
      id: id(),
      marketId: $event.market.id,
      name: $event.market.name,
      category: $event.market.category,
      price: $event.market.price,
      quantity: $event.quantity,
    };
    this.store.dispatch(new MarketsActions.MarketPurchase(portfolio));
  }

  onReload($event) {
    const myMap = new Map();
    const filter: Filters = myMap.set('category', $event);
    const params: LoadListPayload = new LoadListPayload({filters: filter});
    this.store.dispatch(new MarketsActions.LoadMarkets(params));
  }
}
