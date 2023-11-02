const express = require('express')
const router = express.Router()

const { generateVoucher, getAllRedeemedVouchers } = require('../controllers/generatedVoucherController')
const { grantAccess } = require('../middlewares/verifyAuthorization')
const { requireClientAuth } = require('../middlewares/requireClientAuth')
const { requireAuth } = require('../middlewares/requireAuth')

router.post('/generate-voucher', requireClientAuth, generateVoucher)

router.get('/redeemed-vouchers', requireAuth, getAllRedeemedVouchers)


module.exports = router