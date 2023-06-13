const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    // Check if user is logged in
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'You Must login first'})
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id, user_id, name, email, phone, role } = await jwt.verify( token, process.env.JWT_SECRET )
        req.user = await User.findOne({ _id, user_id, name, email, phone, role }).select(['_id', 'user_id', 'name', 'email', 'phone', 'role'])
        console.log(`require auth User ${req.user} End require auth`)
        next()
    } catch (error) {
        res.status(401).json({error: 'You are not authorized'})
    }
}

module.exports = { requireAuth }