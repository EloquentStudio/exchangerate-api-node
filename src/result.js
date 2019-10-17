/** Exchangerate api exchange rates result representation. */
class Result {
  /**
   * @param {object} ratesData - API exchange rates data.
   * @property {string} ratesData.base  - Base currency code
   * @property {string} ratesData.date  - Date of exchange rate data.
   * @property {string} ratesData.time_last_updated  - Timestamp of the last updated data.
   * @property {Object.<string, number>} ratesData.rates  - Exchange rate data.
   */
  constructor (ratesData) {
    /**
     * Base currency code
     *  @type {string}
     */
    this.baseCurrencyCode = ratesData.base
    /**
     *  Date of exchange rate data.
     *  @type {date}
     */
    this.date = new Date(ratesData.date)
    /**
     *  Date of last updated data
     *  @type {date}
     */
    this.updatedAt = new Date(ratesData.time_last_updated * 1000)
    /**
     *  Exchange rate data by currency code.
     *  @type {object}
     */
    this.rates = ratesData.rates
  }

  /**
   * @returns {number} Returns number of exchante rate data records.
   */
  get length () {
    return Object.keys(this.rates).length
  }

  /**
   * Get exchange rate value
   *
   * @param {string} currencyCode - The currency code in ISO format.
   * @returns {number}
   */
  getRate (currencyCode) {
    return this.rates[currencyCode]
  }

  /**
   * Convert amount to given currency code.
   * @param {string} currencyCode - Currency code in ISO format.
   * @param {number=} amount - Amount. Default is 1
   */
  conversion (currencyCode, amount = 1) {
    return this.getRate(currencyCode) * amount
  }

  /**
   * Iterate currency exchange rate records.
   *
   * @generator
   * @yields {Array.<string,number>} The exchange rate.
   */
  * [Symbol.iterator] () {
    for (const currencyCode in this.rates) {
      yield [currencyCode, this.rates[currencyCode]]
    }
  }
}

module.exports = Result
