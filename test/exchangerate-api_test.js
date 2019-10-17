const assert = require('assert');
const exchangeRateApi = require('../src');
const Result = require('../src/result')
const ExchangeRateError = require('../src/exchangeRateError')

describe('exchangerate-api', () => {
  it('fetch exchange rates', async () => {
    const result = await exchangeRateApi.ratesFor('USD');
    assert.strictEqual(result instanceof Result, true);

    assert.strictEqual(result.baseCurrencyCode, 'USD'); 
    assert.strictEqual(result.date instanceof Date, true);
    assert.strictEqual(result.updatedAt instanceof Date, true);
    assert.strictEqual(result.length > 0, true);

    for(let [code, rate] of result){
      assert.strictEqual(typeof code, 'string'); 
      assert.strictEqual(typeof rate, 'number');
    }

    assert.strictEqual(result.getRate('EUR') > 0, true);
    assert.strictEqual(result.conversion('EUR', 10) > 0, true);
    assert.strictEqual(result.conversion('EUR') > 0, true);
  })

  it('fetch USD exchange rates', async () => {
    const result = await exchangeRateApi.ratesForUSD();

    assert.strictEqual(result instanceof Result, true);
    assert.strictEqual(result.length > 0, true);
  })

  it('throws error for invalid currency code', async () => {
    try {
      await exchangeRateApi.ratesFor('INVALID');
    } catch (err) {
      assert(err instanceof ExchangeRateError);
      assert.strictEqual(err.statusCode, 404);   
    }
  })
})
