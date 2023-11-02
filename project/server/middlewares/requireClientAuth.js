const jwt = require('jsonwebtoken')
const Client = require('../models/Client')

const requireClientAuth = async (req, res, next) => {
    // Check if client is logged in
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'You Must logjn first'})
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id, name, phone, loyalty_points, amount_spent, created_at } = await jwt.verify( token, process.env.JWT_CLIENT_SECRET )
        req.client = await Client.findOne({ _id, name, phone, loyalty_points, amount_spent, created_at }).select(['_id', 'name', 'phone', 'loyalty_points', 'amount_spent', 'created_at'])
        console.log(`require auth Client ${req.client} End require auth`)
        next()
    } catch (error) {
        res.status(401).json({error: 'You are not authorized'})
    }
}

module.exports = { requireClientAuth }