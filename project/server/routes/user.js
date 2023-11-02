const express = require('express')
const router = express.Router()

const { getAll, getUser, getProfile, getAdmins, getSuperAdmins, updateUser, deleteUser } = require('../controllers/userController')
const { requireAuth } = require('../middlewares/requireAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')

router.get('/all-users', requireAuth, grantAccess('readAny', 'user'), getAll)
router.get('/user/:id', requireAuth, grantAccess('readAny', 'user'), getUser)

router.get('/profile', requireAuth, grantAccess('readOwn', 'user'), getProfile)

router.get('/admins', requireAuth, grantAccess('readAny', 'user'), getAdmins)
router.get('/super-admins', requireAuth, grantAccess('readAny', 'user'), getSuperAdmins)


router.put('/update-user/:id', requireAuth, grantAccess('updateAny', 'user'), updateUser)
router.delete('/delete-user/:id', requireAuth, grantAccess('readAny', 'user'), deleteUser)

module.exports = router