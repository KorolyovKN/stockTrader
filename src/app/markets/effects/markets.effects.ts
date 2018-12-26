import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';

import * as fromMarkets from '../reducers';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  MarketsActionTypes,
  LoadMarkets,
  LoadMarketsSuccess,
  LoadMarketsError,
  LoadMarketsCategories,
  LoadMarketsCategoriesSuccess,
  LoadMarketsCategoriesError,
  MarketPurchase,
  MarketPurchaseSuccess,
  MarketPurchaseError
} from '../actions/markets.actions';

import { Market } from '../models/market';
import { MarketsService } from '../services/markets.service';
import { LoadListSuccessPayload, LoadListPayload } from '../../shared/models/list';
import { Portfolio } from '../../shared/models/portfolio';
import { BalanceDecrease } from '../../core/actions/balance.actions';

@Injectable()
export class MarketsEffects {

  @Effect()
  LoadMarkets: Observable<Action> = this.actions$.pipe(
    ofType<LoadMarkets>(MarketsActionTypes.LoadMarkets),
    map((action) => action.payload),
    switchMap((params: LoadListPayload) => this.marketsService.loadMarkets(params)
      .pipe(
        map((payload: LoadListSuccessPayload<Market>) => {
          return new LoadMarketsSuccess(payload);
        }),
        catchError((e) => of(new LoadMarketsError(e.error.error)))
      ))
  );

  @Effect()
  LoadCategories: Observable<Action> = this.actions$.pipe(
    ofType<LoadMarketsCategories>(MarketsActionTypes.LoadMarketsCategories),
    switchMap(() => this.marketsService.loadCategories()
      .pipe(
        map((payload) => new LoadMarketsCategoriesSuccess(payload.data)),
        catchError((e) => of(new LoadMarketsCategoriesError(e.error.error)))
      ))
  );

  @Effect()
  PurchaseMarket: Observable<Action> = this.actions$.pipe(
    ofType<MarketPurchase>(MarketsActionTypes.MarketPurchase),
    map((action) => action.payload),
    switchMap((payload: Portfolio) => this.marketsService.purchaseMarket(payload)
      .pipe(
        map((portfolio) => new MarketPurchaseSuccess(portfolio)),
        catchError((e) => of(new MarketPurchaseError(e.error.error)))
      ))
  );

  @Effect()
  DeceaseBalance: Observable<Action> = this.actions$.pipe(
    ofType<MarketPurchase>(MarketsActionTypes.MarketPurchaseSuccess),
    map((action) => {
      const portfolio = action.payload;
      const decrease = +portfolio.price * +portfolio.quantity;
      return new BalanceDecrease(decrease);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromMarkets.State>,
    private marketsService: MarketsService
  ) {}
}

