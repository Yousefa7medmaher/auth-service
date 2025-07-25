/**
 * Helper to send HTTP responses
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {object} data - Response data (object or string)
 */
export function sendResponse(res, statusCode, data) {
  res.status(statusCode).send(data);
} 