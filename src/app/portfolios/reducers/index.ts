import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromPortfolios from './portfolio.reducers';

export interface PortfoliosState {
  portfolios: fromPortfolios.State;
}

export interface State extends fromRoot.State {
  portfolios: PortfoliosState;
}

export const reducers: ActionReducerMap<PortfoliosState> = {
  portfolios: fromPortfolios.redicer,
};

export const getPortfolioState = createFeatureSelector<State, PortfoliosState>('portfolios');

export const getPortfolioEntitiesState = createSelector(
  getPortfolioState,
  state => state.portfolios,
);

export const getPortfolioCount = createSelector(
  getPortfolioEntitiesState,
  fromPortfolios.getCount,
);

export const getPortfolioPending = createSelector(
  getPortfolioEntitiesState,
  fromPortfolios.getPending,
);

export const getPortfolioError = createSelector(
  getPortfolioEntitiesState,
  fromPortfolios.getError,
);

export const {
  selectEntities: getPortfolioEntities,
  selectAll: getPortfolios,
} = fromPortfolios.portfolioEntityAdapter.getSelectors(getPortfolioEntitiesState);
