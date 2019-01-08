import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromMarkets from './markets.reducers';

export interface MarketsState {
  markets: fromMarkets.State;
}

export interface State extends fromRoot.State {
  markets: MarketsState;
}

export const reducers: ActionReducerMap<MarketsState> = {
  markets: fromMarkets.reducer,
};

export const getMarketsState = createFeatureSelector<State, MarketsState>('markets');

export const getMarketsEntitiesState = createSelector(
  getMarketsState,
  state => state.markets,
);

export const getMarketsCount = createSelector(
  getMarketsEntitiesState,
  fromMarkets.getCount,
);

export const getMarketsPending = createSelector(
  getMarketsEntitiesState,
  fromMarkets.getPending,
);

export const getMarketsError = createSelector(
  getMarketsEntitiesState,
  fromMarkets.getError,
);

export const getMarketsCategories = createSelector(
  getMarketsEntitiesState,
  fromMarkets.getCategories,
);

export const {
  selectEntities: getMarketsEntities,
  selectAll: getMarkets,
} = fromMarkets.marketsEntityAdapter.getSelectors(getMarketsEntitiesState);

