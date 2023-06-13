const express = require('express')
const router = express.Router()

const { getProfile } = require('../controllers/userController')
const { requireAuth } = require('../middlewares/requireAuth')

router.get('/profile', requireAuth, getProfile)

module.exports = router