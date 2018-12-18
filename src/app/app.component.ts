import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import * as coreActions from './core/actions/balance.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private store: Store<any>) {
  }

  balancePlus() {
    this.store.dispatch(new coreActions.BalanceIncrease(100));
  }

  balanceMinus() {
    this.store.dispatch(new coreActions.BalanceDecrease(100));
  }
}
