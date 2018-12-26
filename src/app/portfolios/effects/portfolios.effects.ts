import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromPortfolios from '../reducers';
import { BalanceIncrease, BalanceDecrease } from '../../core/actions/balance.actions';
import {
  PortfolioActionTypes,
  LoadPortfolio,
  LoadPortfolioSuccess,
  LoadPortfolioError,
  SellFullPortfolio,
  SellFullPortfolioSuccess, SellPortfolioMarkets, SellPortfolioMarketsSuccess
} from '../actions/portfolio.actions';
import { Portfolio } from '../../shared/models/portfolio';
import { PortfoliosService } from '../services/portfolios.service';
import { LoadListSuccessPayload, LoadListPayload } from '../../shared/models/list';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class PortfoliosEffects {
  @Effect()
  LoadPortfolios: Observable<Action> = this.actions$.pipe(
    ofType<LoadPortfolio>(PortfolioActionTypes.LoadPortfolio),
    map((action) => action.payload),
    switchMap((params: LoadListPayload) => this.portfoliosService.loadPortfolios(params)
      .pipe(
        map((payload: LoadListSuccessPayload<Portfolio>) => {
          return new LoadPortfolioSuccess(payload);
        }),
        catchError((e) => of(new LoadPortfolioError(e.error.error)))
      ))
  );

  @Effect()
  RemovePortfolio: Observable<Action> = this.actions$.pipe(
    ofType<SellFullPortfolio>(PortfolioActionTypes.SellFullPortfolio),
    map((action) => action.payload),
    switchMap((portfolio: Portfolio) => this.portfoliosService.removePortfolio(portfolio)
      .pipe(
        tap((payload) => {
          const sum = +payload.price * +payload.quantity;
          this.store.dispatch(new BalanceIncrease(sum));
        }),
        map((payload: Portfolio) => {
          return new SellFullPortfolioSuccess(payload);
        }),
        catchError((e) => of(new LoadPortfolioError(e.error.error)))
      ))
  );

  @Effect()
  UpdatePortfolio: Observable<Action> = this.actions$.pipe(
    ofType<SellPortfolioMarkets>(PortfolioActionTypes.SellPortfolioMarkets),
    map((action) => action.payload),
    switchMap((portfolio: Portfolio) => this.portfoliosService.updatePortfolio(portfolio)
      .pipe(
        tap((payload) => {
          const sum = +payload.price * +payload.quantity;
          this.store.dispatch(new BalanceIncrease(200));
        }),
        map((updatedPortfolio: Portfolio) => {
          return new SellPortfolioMarketsSuccess(updatedPortfolio);
        }),
        catchError((e) => of(new LoadPortfolioError(e.error.error)))
      ))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromPortfolios.State>,
    private portfoliosService: PortfoliosService
  ) {}
}
