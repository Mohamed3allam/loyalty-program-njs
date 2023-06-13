const express = require('express')
const router = express.Router()

const { createOrder, getAllOrders, getClientOrders, getOrder, deleteOrder } = require('../controllers/orderController')
const { requireAuth } = require('../middlewares/requireAuth')
const { requireClientAuth } = require('../middlewares/requireClientAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')

router.post('/create-order', requireAuth, createOrder)

router.get('/all-orders', requireAuth, grantAccess('readAny', 'orders'), getAllOrders)

router.get('/client-orders/:phone', requireAuth, getClientOrders)

router.get('/order/:id', requireAuth, getOrder)

router.delete('/delete-order', requireAuth, grantAccess('deleteAny', 'order'), deleteOrder)

module.exports = router