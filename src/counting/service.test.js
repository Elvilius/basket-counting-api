import { getCartCountingInRubles } from './service';

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
    const exchange = { RUB: { Value: 1 }, EUR: { Value: 85 }, USD: { Value: 75 } };
    expect(getCartCountingInRubles(cart, exchange)).toBe(2910);
  });
});
