import axios from 'axios';

const exchangeRatesApi = 'https://www.cbr-xml-daily.ru/daily_json.js';

export const getTheExchangeRates = async () => {
  try {
    const { data } = await axios.get(exchangeRatesApi);
    return { ...data, RUB: { Value: 1 } };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCartCountingInRubles = (cart, exchange) => cart.reduce((acc, item) => {
  const { quantity, price, currency } = item;
  if (!(currency in exchange)) {
    throw new Error(`invalid currency ${currency}`);
  }
  const { Value } = exchange[currency];
  return acc + (quantity * price * Value);
}, 0);

export const getConvertCurrency = (sum, exchange, currencies = ['RUB', 'EUR', 'USD']) => currencies.reduce((acc, currency) => {
  const { Value } = exchange[currency];
  const convert = Number((sum / Value).toFixed(2));
  return { ...acc, [currency]: convert };
}, {});
