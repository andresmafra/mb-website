const express = require('express')
const router = express.Router()
const brokersService = require('../services/brokersService')

router.get('/realtime/quotation', async (req, res) => {
  const quotation = await brokersService.realtimeQuotation()
  res.send(quotation)
});

module.exports = router;