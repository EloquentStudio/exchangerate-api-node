/** Exchangerate api error. */
class ExchangeRateError extends Error {
  /**
   *
   * @param {number} statusCode - HTTP error code.
   * @param {object} message - The api error message object.
   */
  constructor (statusCode, message) {
    super(message.error_type || message)

    /**
     * HTTP status code.
     * @type {number}
     */
    this.statusCode = statusCode

    /**
     * API error response object.
     * @type {object}
     */
    this.message = message
  }
}

module.exports = ExchangeRateError
