const express = require('express')
const router = express.Router()

const {  updateLoyaltyPoints, getLoyaltyPoints } = require('../controllers/loyaltyPointsController')
const { grantAccess } = require('../middlewares/verifyAuthorization')
const { requireClientAuth } = require('../middlewares/requireClientAuth')
const { requireAuth } = require('../middlewares/requireAuth')

// router.post('/add-loyalty-points', requireAuth, addLoyaltyPoints)

router.get('/', requireAuth, getLoyaltyPoints)
router.put('/update-loyalty-points/:id', requireAuth, updateLoyaltyPoints)


module.exports = router