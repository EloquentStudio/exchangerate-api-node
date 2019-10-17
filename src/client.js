const fetch = require('node-fetch')
const ExchangeRateError = require('./exchangeRateError')
const Result = require('./result')

/** @constant {string} SERVICE_ADDRESS - exchange rate API server host
 * @default https://api.exchangerate-api.com
*/
const SERVICE_ADDRESS = 'https://api.exchangerate-api.com'

/** Exchangerate API client. */
class Client {
  /**
   * Create an API client instance.
   * @param {string=} version - Version of the api. Default value is 'v4'
   */
  constructor (version = 'v4') {
    /**
     * Version of the API. Default value is 'v4'
     * @type {string}
     */
    this.version = version
  }

  /**
   * Fetch exchange rate.
   * {@link https://www.exchangerate-api.com/docs/supported-currencies|supported currency code}
   *
   * @async
   * @param {string} currencyCode - Currency code in ISO format. i.e 'USD', 'EUR'
   * @return {Promise<Result>} Rate exchange result instance.
   * @throws {ExchangeRateError} If not supported or invalid currency code.
   */
  async ratesFor (currencyCode) {
    const url = `${SERVICE_ADDRESS}/${this.version}/latest/${currencyCode}`
    const resp = await fetch(url)
    const ratesData = await resp.json()

    if (resp.ok) {
      return new Result(ratesData)
    }

    throw new ExchangeRateError(resp.status, ratesData)
  }

  /**
   * Fetch exchange rate data for US doller(USD).
   *
   * @async
   * @return {Promise<Result>} Rate exchange result for USD.
   */
  async ratesForUSD () {
    return this.ratesFor('USD')
  }
}

module.exports = Client
