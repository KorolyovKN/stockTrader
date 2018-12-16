import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromCore from '../core/reducers/balance.reducers';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  userBalance: fromCore.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  userBalance: fromCore.reducer,
  router: fromRouter.routerReducer,
};

/**
 * Router Reducers
 */
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState>('router');

export const getRouterSerializedState = createSelector(
  getRouterState,
  (rrs: fromRouter.RouterReducerState) => (rrs && rrs.state) || null
);

/**
 * Core Reducers
 */
export const getUserBalanceState = createFeatureSelector<fromCore.State>('userBalance');

export const getUserBalance = createSelector(
  getUserBalanceState,
  fromCore.getUserBalance
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
