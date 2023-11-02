const express = require('express')
const router = express.Router()

const { requireAuth } = require('../middlewares/requireAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')
const { signupUser, loginUser } = require('../controllers/userAuthController')

router.post('/signup-user', requireAuth, grantAccess('createAny', 'user'), signupUser)
router.post('/login-user', loginUser)

module.exports = router