import { Action } from '@ngrx/store';

import { Market } from '../models/market';
import { LoadListSuccessPayload, LoadListPayload } from '../../shared/models/list';

export enum MarketsActionTypes {
  LoadMarkets = '[Markets] Load Markets',
  LoadMarketsSuccess = '[Markets] Load Markets Success',
  LoadMarketsError = '[Markets] Load Markets Error',
  LoadMarketsCategories = '[Markets] Load Markets Categories',
  LoadMarketsCategoriesSuccess = '[Markets] Load Markets Categories Success',
  LoadMarketsCategoriesError = '[Markets] Load Markets Categories Error',
}

export class LoadMarkets implements Action {
  readonly type = MarketsActionTypes.LoadMarkets;

  constructor(public payload: LoadListPayload = new LoadListPayload()) {
  }
}

export class LoadMarketsSuccess implements Action {
  readonly type = MarketsActionTypes.LoadMarketsSuccess;

  constructor(public payload: LoadListSuccessPayload<Market>) {
  }
}

export class LoadMarketsError implements Action {
  readonly type = MarketsActionTypes.LoadMarketsError;

  constructor(public payload: string) {
  }
}

export class LoadMarketsCategories implements Action {
  readonly type = MarketsActionTypes.LoadMarketsCategories;
}

export class LoadMarketsCategoriesSuccess implements Action {
  readonly type = MarketsActionTypes.LoadMarketsCategoriesSuccess;

  constructor(public payload: Array<string>) {
  }
}

export class LoadMarketsCategoriesError implements Action {
  readonly type = MarketsActionTypes.LoadMarketsCategoriesError;

  constructor(public payload: string) {
  }
}

export type MarketsActionsUnion =
  | LoadMarkets
  | LoadMarketsSuccess
  | LoadMarketsError
  | LoadMarketsCategories
  | LoadMarketsCategoriesSuccess
  | LoadMarketsCategoriesError
;
