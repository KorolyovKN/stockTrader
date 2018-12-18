import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, select, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import {
  BalanceActionTypes,
  LoadBalance,
  LoadBalanceSuccess,
  LoadBalanceError,
  UpdateBalanceSuccess,
  UpdateBalanceError,
  BalanceDecrease, BalanceLowCredit, BalanceHiCredit
} from '../actions/balance.actions';
import { BalanceService } from '../services/balance.service';
import {exhaustMap, withLatestFrom} from 'rxjs/internal/operators';


@Injectable()
export class BalanceEffects {

  @Effect()
  LoadUserBalance: Observable<Action> = this.actions$.pipe(
    ofType<LoadBalance>(BalanceActionTypes.LoadBalance),
    switchMap(() => this.balanceService.loadUserBalance()
      .pipe(
        map((payload: number) => new LoadBalanceSuccess(payload)),
        catchError((e) => of(new LoadBalanceError(e.error.error)))
      ))
  );

  @Effect()
  CheckUserBalance: Observable<Action> = this.actions$.pipe(
    ofType<BalanceDecrease>(BalanceActionTypes.BalanceDecrease),
    withLatestFrom(
      this.store.pipe(select(fromRoot.getUserBalance)),
      (action, balance: number) => ({decrease: action.payload, balance: balance})
    ),
    map((options) => {
      if (options.decrease <= options.balance) {
        return new BalanceHiCredit(options.balance);
      } else {
        return new BalanceLowCredit(options.balance);
      }
    })
  );

  @Effect()
  ChangeBalance: Observable<Action> = this.actions$.pipe(
    ofType(BalanceActionTypes.BalanceIncrease, BalanceActionTypes.BalanceHiCredit),
    withLatestFrom(
      this.store.pipe(select(fromRoot.getUserBalance)),
      (action, balance: number) => balance
    ),
    exhaustMap((balance) => {
      return this.balanceService.updateBalance(balance)
        .pipe(
          map((payload: number) => new UpdateBalanceSuccess(payload)),
          catchError((e) => of(new UpdateBalanceError(e.error.error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromRoot.State>,
    private balanceService: BalanceService
  ) {}
}
