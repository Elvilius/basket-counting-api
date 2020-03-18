import { getCartCountingInRubles, getConvertCurrency } from './service';

const exchange = { RUB: { Value: 1 }, EUR: { Value: 85 }, USD: { Value: 75 } };

describe('get cart counting in rubles', () => {
  test('should return cart sum', async () => {
    const cart = [
      {
        name: 'Milk',
        quantity: 1,
        price: 20,
        currency: 'RUB',
      },
      {
        name: 'Milk',
        quantity: 2,
        price: 17,
        currency: 'EUR',
      },
    ];
    expect(getCartCountingInRubles(cart, exchange)).toBe(2910);
  });
  test('should return error', async () => {
    const cart = [
      {
        name: 'Milk',
        quantity: 1,
        price: 20,
        currency: 'DDD',
      },
    ];
    expect(() => getCartCountingInRubles(cart, exchange)).toThrow('invalid currency DDD');
  });
});

describe('get convert currency', () => {
  test('should return convert', async () => {
    const sum = 2910;
    const convertResult = { EUR: 34.24, RUB: 2910.00, USD: 38.80 };
    expect(getConvertCurrency(sum, exchange)).toEqual(convertResult);
  });
});
