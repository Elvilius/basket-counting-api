import axios from 'axios';

const exchangeRatesApi = 'https://www.cbr-xml-daily.ru/daily_json.js';

export const getTheExchangeRates = async () => {
  try {
    const { data } = await axios.get(exchangeRatesApi);
    const { Valute } = data;
    return { ...Valute, RUB: { Value: 1 } };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCartCountingInRubles = (cart, exchanges) => cart.reduce((acc, item) => {
  const { quantity, price, currency } = item;
  if (!(currency in exchanges)) {
    throw new Error(`invalid currency ${currency}`);
  }
  const { Value } = exchanges[currency];
  return acc + (quantity * price * Value);
}, 0);

export const getConvertCurrency = (sum, exchanges, currencies = ['RUB', 'EUR', 'USD']) => currencies.reduce((acc, currency) => {
  const { Value } = exchanges[currency];
  const convert = Number((sum / Value).toFixed(2));
  return { ...acc, [currency]: convert };
}, {});
