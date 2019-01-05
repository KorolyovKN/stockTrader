import * as faker from 'faker/locale/en_US';

export interface Market {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const generateMarket = (): Market => {
  return {
    id: faker.random.number(),
    name: faker.address.streetName(),
    price: faker.random.number({min: 1, max: 300}),
    category: faker.commerce.department()
  };
};

export const generateMarkets = (
  count = faker.random.number({ min: 1, max: 20 })
): Market[] => {
  return Array.apply(null, Array(count)).map(() => generateMarket());
};
