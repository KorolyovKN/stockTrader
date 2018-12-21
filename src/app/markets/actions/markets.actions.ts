import { Action } from '@ngrx/store';

import { Market } from '../models/market';
import { LoadListSuccessPayload, LoadListPayload } from '../../shared/models/list';
import {Portfolio} from '../../shared/models/portfolio';

export enum MarketsActionTypes {
  LoadMarkets = '[Markets] Load Markets',
  LoadMarketsSuccess = '[Markets] Load Markets Success',
  LoadMarketsError = '[Markets] Load Markets Error',
  LoadMarketsCategories = '[Markets] Load Markets Categories',
  LoadMarketsCategoriesSuccess = '[Markets] Load Markets Categories Success',
  LoadMarketsCategoriesError = '[Markets] Load Markets Categories Error',
  MarketPurchase = '[Markets] Market Purchase',
  MarketPurchaseSuccess = '[Markets] Market Purchase Success',
  MarketPurchaseError = '[Markets] Market Purchase Error'
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


export class MarketPurchase implements Action {
  readonly type = MarketsActionTypes.MarketPurchase;

  constructor(public payload: Portfolio) {
  }
}

export class MarketPurchaseSuccess implements Action {
  readonly type = MarketsActionTypes.MarketPurchaseSuccess;
  constructor(public payload: Portfolio) {
  }
}

export class MarketPurchaseError implements Action {
  readonly type = MarketsActionTypes.MarketPurchaseError;

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
  | MarketPurchase
  | MarketPurchaseSuccess
  | MarketPurchaseError
;
