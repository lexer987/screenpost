/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const amedas = require('./amedas.js');
exports.helloHttp = amedas;
