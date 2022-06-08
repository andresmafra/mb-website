const mongoGateway = require('../gateways/mongoGateway')

const realtimeQuotation = async () => {
  const quotations = await mongoGateway.getLastQuotations()
  return quotations
}

module.exports = {
  realtimeQuotation
}