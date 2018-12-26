import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {LoadPortfolioSuccess, PortfolioActionTypes, PortfolioActionUnion} from '../actions/portfolio.actions';
import { Portfolio } from '../../shared/models/portfolio';

export interface State extends EntityState<Portfolio> {
  // additional entities state properties
  pending: boolean;
  selPending: boolean;
  error: string | null;
  count: number;
}

export const portfolioEntityAdapter: EntityAdapter<Portfolio> =
  createEntityAdapter<Portfolio>({
    selectId: (portfolio: Portfolio) => portfolio.id,
    sortComparer: false
  });

export const initialState: State = portfolioEntityAdapter.getInitialState({
  pending: false,
  selPending: false,
  error: null,
  count: 0,
});

export function redicer(state = initialState, action: PortfolioActionUnion): State {
  switch (action.type) {
    case PortfolioActionTypes.LoadPortfolio: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case PortfolioActionTypes.LoadPortfolioSuccess: {
      return portfolioEntityAdapter.addAll(action.payload.data, {
        ...state,
        error: null,
        pending: false,
        count: action.payload.count,
      });
    }

    case PortfolioActionTypes.LoadPortfolioError: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        count: 0,
      };
    }

    case PortfolioActionTypes.SellPortfolioMarkets: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case PortfolioActionTypes.SellPortfolioMarketsSuccess: {
      const changes = action.payload;
      const id = changes.id;
      return portfolioEntityAdapter.updateOne({id, changes}, {
        ...state,
        error: null,
        pending: false,
      });
    }

    case PortfolioActionTypes.SellFullPortfolio: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case PortfolioActionTypes.SellFullPortfolioSuccess: {
      return portfolioEntityAdapter.removeOne(String(action.payload.id), {
        ...state,
        error: null,
        pending: false,
      });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getCount = (state: State) => state.count;
