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
import { initialState, redicer } from './markets.reducers';

describe('Markets reducer', () => {
  const bloomming: Market = {
    id: 5,
    name: 'Blooming; Brands, Inc.',
    price: 98.54,
    category: 'Consumer Services',
  };

  it('should return the default state', () => {
    const action = {type: 'NOOP'} as any;
    const result = redicer(undefined, action);

    expect(result).toBe(initialState);
  });
});
