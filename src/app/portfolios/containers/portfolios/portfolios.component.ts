import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as PortfolioActions from '../../actions/portfolio.actions';
import * as fromPortfolios from '../../reducers';
import {BalanceIncrease} from '../../../core/actions/balance.actions';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent implements OnInit {

  portfolios$ = this.store.pipe(select(fromPortfolios.getPortfolios));
  pending$ = this.store.pipe(select(fromPortfolios.getPortfolioPending));
  error$ = this.store.pipe(select(fromPortfolios.getPortfolioError));

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new PortfolioActions.LoadPortfolio());
  }

  onSell($event) {
    const {portfolio, quantity} = $event;
    if (portfolio.quantity > quantity) {
      const updatedPortfolio = portfolio;
      const balanceCredit = portfolio.price * quantity;
      updatedPortfolio.quantity -= quantity;
      this.store.dispatch(new PortfolioActions.SellPortfolioMarkets(updatedPortfolio));
      this.store.dispatch(new BalanceIncrease(balanceCredit));
    } else {
      this.store.dispatch(new PortfolioActions.SellFullPortfolio(portfolio));
    }
  }

}
