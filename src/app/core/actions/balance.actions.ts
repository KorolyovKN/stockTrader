import { Action } from '@ngrx/store';

export enum BalanceActionTypes {
  LoadBalance = '[Balance] Load Balance',
  LoadBalanceSuccess = '[Balance] Load Balance Success',
  LoadBalanceError = '[Balance] Load Balance Error',
  BalanceIncrease = '[Balance] Balance Increase',
  BalanceDecrease = '[Balance] Balance Decrease',
  BalanceLowCredit = '[Balance] Balance Low Credit',
  BalanceHiCredit = '[Balance] Balance Hi Credit',
  UpdateBalance = '[Balance] Update Balance',
  UpdateBalanceSuccess = '[Balance] Update Balance Success',
  UpdateBalanceError = '[Balance] Balance Update Error'
}

export class LoadBalance implements Action {
  readonly type = BalanceActionTypes.LoadBalance;
}

export class LoadBalanceSuccess implements Action {
  readonly type = BalanceActionTypes.LoadBalanceSuccess;

  constructor(public payload: number) {
  }
}

export class LoadBalanceError implements Action {
  readonly type = BalanceActionTypes.LoadBalanceError;

  constructor(public payload: string) {
  }
}

export class BalanceIncrease implements Action {
  readonly type = BalanceActionTypes.BalanceIncrease;

  constructor(public payload: number) {
  }
}

export class BalanceDecrease implements Action {
  readonly type = BalanceActionTypes.BalanceDecrease;

  constructor(public payload: number) {
  }
}

export class BalanceLowCredit implements Action {
  readonly type = BalanceActionTypes.BalanceLowCredit;

  constructor(public payload: number) {
  }
}

export class BalanceHiCredit implements Action {
  readonly type = BalanceActionTypes.BalanceHiCredit;

  constructor(public payload: number) {
  }
}

export class UpdateBalance implements Action {
  readonly type = BalanceActionTypes.UpdateBalance;
}

export class UpdateBalanceSuccess implements Action {
  readonly type = BalanceActionTypes.UpdateBalanceSuccess;

  constructor(public payload: number) {
  }
}

export class UpdateBalanceError implements Action {
  readonly type = BalanceActionTypes.UpdateBalanceError;

  constructor(public payload: string) {
  }
}

export type BalanceActionUnion =
  | LoadBalance
  | LoadBalanceSuccess
  | LoadBalanceError
  | BalanceIncrease
  | BalanceDecrease
  | UpdateBalance
  | UpdateBalanceSuccess
  | UpdateBalanceError
  ;
