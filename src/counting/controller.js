import express from 'express';
import { getTheExchangeRates, getCartCountingInRubles, getConvertCurrency } from './service';
import validate from './validate';

const router = express.Router();

router.post('/', validate, async (req, res) => {
  try {
    const { body } = req;
    const exchange = await getTheExchangeRates();
    const countingInRubles = getCartCountingInRubles(body, exchange);
    const convertCurrency = getConvertCurrency(countingInRubles, exchange);
    return res.json({ data: convertCurrency });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
});

export default router;
