import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  MarketsActionsUnion,
  MarketsActionTypes
} from '../actions/markets.actions';
import { Market } from '../models/market';

export interface State extends EntityState<Market> {
  // additional entities state properties
  error: string | null;
  pending: boolean;
  purchasePending: boolean;
  count: number;
  categories: string[];
}

export const marketsEntityAdapter: EntityAdapter<Market> =
  createEntityAdapter<Market>({
    selectId: (market: Market) => market.id,
    sortComparer: false
  });

export const initialState: State = marketsEntityAdapter.getInitialState({
  error: null,
  pending: false,
  purchasePending: false,
  count: 0,
  categories: [],
});

export function reducer(state = initialState, action: MarketsActionsUnion): State {
  switch (action.type) {
    case MarketsActionTypes.LoadMarkets: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case MarketsActionTypes.LoadMarketsSuccess: {
      return marketsEntityAdapter.addAll(action.payload.data, {
        ...state,
        error: null,
        pending: false,
        count: action.payload.count,
      });
    }

    case MarketsActionTypes.LoadMarketsError: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        count: 0
      };
    }

    case MarketsActionTypes.LoadMarketsCategories: {
      return {
        ...state,
        error: null,
      };
    }

    case MarketsActionTypes.LoadMarketsCategoriesSuccess: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case MarketsActionTypes.LoadMarketsCategoriesError: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        count: 0
      };
    }

    case MarketsActionTypes.MarketPurchase: {
      return {
        ...state,
        error: null,
        purchasePending: true,
      };
    }

    case MarketsActionTypes.MarketPurchaseSuccess: {
      return {
        ...state,
        purchasePending: false,
      };
    }

    case MarketsActionTypes.MarketPurchaseError: {
      return {
        ...state,
        error: action.payload,
        purchasePending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getCount = (state: State) => state.count;
export const getCategories = (state: State) => state.categories;
