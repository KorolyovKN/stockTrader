import { Market } from '../models/market';
import {
  LoadMarkets,
  LoadMarketsSuccess,
  LoadMarketsError,
  LoadMarketsCategories,
  LoadMarketsCategoriesSuccess,
  LoadMarketsCategoriesError,
  MarketPurchase,
  MarketPurchaseSuccess,
  MarketPurchaseError
} from '../actions/markets.actions';
import { initialState, reducer } from './markets.reducers';
import { LoadListPayload, LoadListSuccessPayload } from '../../shared/models/list';

describe('Markets reducer', () => {
  const bloomming: Market = {
    id: 5,
    name: 'Blooming; Brands, Inc.',
    price: 98.54,
    category: 'Consumer Services',
  };

  it('should return the default state', () => {
    const action = {type: 'NOOP'} as any;
    const result = reducer(undefined, action);

    expect(result).toBe(initialState);
  });

  describe('[Markets] Load Markets', () => {
    it('should toggle pending state', () => {
      const payload = new LoadListPayload();
      const action = new LoadMarkets(payload);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: null,
        pending: true
      });
    });
  });

  describe('[Markets] Load Markets Success', () => {
    it('should add all users to state', () => {
      const markets = [bloomming];
      const payload: LoadListSuccessPayload<Market> = {
        count: 1,
        data: markets
      };
      const action = new LoadMarketsSuccess(payload);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: markets.reduce(
          (entityMap, market) => ({
            ...entityMap,
            [market.id]: market
          }),
          {}
        ),
        ids: markets.map(market => market.id),
        pending: false,
        error: null,
        count: 1
      });
    });
  });

  describe('[Markets] Load Markets Error', () => {
    it('should update error state', () => {
      const errorMessage = 'Error message';
      const action = new LoadMarketsError(errorMessage);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: errorMessage,
        pending: false
      });
    });
  });
});
