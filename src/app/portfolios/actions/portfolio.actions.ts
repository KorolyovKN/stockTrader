import { Action } from '@ngrx/store';

import { Portfolio } from '../../shared/models/portfolio';
import { LoadListSuccessPayload, LoadListPayload } from '../../shared/models/list';

export enum PortfolioActionTypes {
  LoadPortfolio = '[Portfolio] Load Portfolio',
  LoadPortfolioSuccess = '[Portfolio] Load Portfolio Success',
  LoadPortfolioError = '[Portfolio] Load Portfolio Error',
  SellPortfolioMarkets = '[Portfolio] Sell Portfolio Markets',
  SellPortfolioMarketsSuccess = '[Portfolio] Sell Portfolio Markets Success',
  SellFullPortfolio = '[Portfolio] Sell Full Portfolio',
  SellFullPortfolioSuccess = '[Portfolio] Sell Full Portfolio Success',
}

export class LoadPortfolio implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolio;

  constructor(public payload: LoadListPayload = new LoadListPayload()) {
  }
}

export class LoadPortfolioSuccess implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolioSuccess;

  constructor(public payload: LoadListSuccessPayload<Portfolio>) {
  }
}

export class LoadPortfolioError implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolioError;

  constructor(public payload: string) {
  }
}

export class SellPortfolioMarkets implements Action {
  readonly type = PortfolioActionTypes.SellPortfolioMarkets;

  constructor(public payload: Portfolio) {
  }
}

export class SellPortfolioMarketsSuccess implements Action {
  readonly type = PortfolioActionTypes.SellPortfolioMarketsSuccess;

  constructor(public payload: Portfolio) {
  }
}

export class SellFullPortfolio implements Action {
  readonly type = PortfolioActionTypes.SellFullPortfolio;

  constructor(public payload: Portfolio) {
  }
}

export class SellFullPortfolioSuccess implements Action {
  readonly type = PortfolioActionTypes.SellFullPortfolioSuccess;

  constructor(public payload: Portfolio) {
  }
}

export type PortfolioActionUnion =
  | LoadPortfolio
  | LoadPortfolioSuccess
  | LoadPortfolioError
  | SellPortfolioMarkets
  | SellPortfolioMarketsSuccess
  | SellFullPortfolio
  | SellFullPortfolioSuccess
;
