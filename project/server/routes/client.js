const express = require('express')
const router = express.Router()

const { signupClient, getAllClients, getClient, updateClient, deleteClient, getProfile, loginClient } = require('../controllers/clientController')
const { requireAuth } = require('../middlewares/requireAuth')
const { requireClientAuth } = require('../middlewares/requireClientAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')

router.post('/signup-client', signupClient)
router.post('/login-client', loginClient)

router.get('/profile', requireClientAuth, getProfile)

router.get('/all-clients', requireAuth, grantAccess('readAny', 'client'), getAllClients)
router.get('/client/:phone', requireAuth, grantAccess('readAny', 'client'), getClient)

router.put('/update-client/:id', requireAuth, grantAccess('updateAny', 'client'), updateClient)
router.delete('/delete-client/:id', requireAuth, grantAccess('deleteAny', 'client'), deleteClient)

module.exports = router