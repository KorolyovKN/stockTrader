import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, select, Action } from '@ngrx/store';

import * as fromMarkets from '../reducers';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import {
  MarketsActionTypes,
  LoadMarkets,
  LoadMarketsSuccess,
  LoadMarketsError,
  LoadMarketsCategories,
  LoadMarketsCategoriesSuccess,
  LoadMarketsCategoriesError
} from '../actions/markets.actions';

import { Market } from '../models/market';
import { MarketsService } from '../services/markets.service';
import {LoadListSuccessPayload, LoadListPayload} from '../../shared/models/list';

@Injectable()
export class MarketsEffects {

  @Effect()
  LoadMarkets: Observable<Action> = this.actions$.pipe(
    ofType<LoadMarkets>(MarketsActionTypes.LoadMarkets),
    map((action) => action.payload),
    switchMap((params: LoadListPayload) => this.marketsService.loadMarkets(params)
      .pipe(
        map((payload: LoadListSuccessPayload<Market>) => new LoadMarketsSuccess(payload)),
        catchError((e) => of(new LoadMarketsError(e.error.error)))
      ))
  );

  @Effect()
  LoadCategories: Observable<Action> = this.actions$.pipe(
    ofType<LoadMarkets>(MarketsActionTypes.LoadMarketsCategories),
    switchMap(() => this.marketsService.loadCategories()
      .pipe(
        map((payload) => new LoadMarketsCategoriesSuccess(payload.data)),
        catchError((e) => of(new LoadMarketsError(e.error.error)))
      ))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromMarkets.State>,
    private marketsService: MarketsService
  ) {}
}

