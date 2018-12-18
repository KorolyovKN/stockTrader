import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as BalanceActions from '../../actions/balance.actions';

@Component({
  selector: 'app-balance-container',
  templateUrl: './balance-container.component.html'
})
export class BalanceContainerComponent implements OnInit {

  userBalance$ = this.store.pipe(select(fromRoot.getUserBalance));

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new BalanceActions.LoadBalance);
  }

}
