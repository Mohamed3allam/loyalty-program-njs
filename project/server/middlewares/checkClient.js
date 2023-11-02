const jwt = require('jsonwebtoken')
const Client = require('../models/Client')

const checkClient = async (req, res, next) => {
    // Check if client is available
    let client_phone = req.body.client_phone
    try {
        if (!client_phone) {
            throw Error('Client Phone is undefined')
        }
        // Validating phone number
        const phone_Regex = /^(002|\+2|2)?01[0125][0-9]{8}$/
        if (!phone_Regex.test(client_phone)) {
            throw Error('Not valid phone number')
        }
        if (client_phone.length === 11) {
            client_phone = 2 + client_phone
        }
        if (client_phone.length === 13) {
            client_phone = client_phone.slice(1)
        }
        if (client_phone.length === 14) {
            client_phone = client_phone.slice(2)
        }
        client_phone = parseInt(client_phone)
        const client = await Client.findOne({phone: client_phone})
        if (!client) {
            throw Error("No client exists with this phone number")
        }
        req.client = client
        next()
    } catch (error) {
        res.status(401).json({error: 'You are not authorized'})
    }
}

module.exports = { checkClient }