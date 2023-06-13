const Client = require('../models/Client')
const Order = require('../models/Order')
const User = require('../models/User')
const { parsePhoneNumberFromString, isPossiblePhoneNumber } = require('libphonenumber-js')


const createOrder = async (req, res) => {
    let { client_phone, total_entered, paid_with } = req.body
    const userId = req.user.id
    try {
        total_entered = parseInt(total_entered)
        const neededLoyaltyPoints = total_entered * 5
        console.log(req.body)
        if (!client_phone || !total_entered || !paid_with) {
            throw Error('All fields must be filled')
        }
        const user = await User.findById(userId)
        if (!user) {
            throw Error("Something went wrong with user")
        }
        // Validating phone number
        function validatePhoneNumber(phone_being_tested) {
            const parsedPhoneNumber = parsePhoneNumberFromString(phone_being_tested, 'EG')
            if (!parsedPhoneNumber) {
                return false
            }
            return parsedPhoneNumber.isValid()
        }
        const isValidPhone = validatePhoneNumber(client_phone)
        if (!isValidPhone) {
            throw Error("Not Valid Phone Number")
        }
        const phone_regex = /^2?01[0125][0-9]{8}$/
        if (!phone_regex.test(client_phone)) {
            throw Error("Not Valid Egyptian Phone Number")
        }
        const client = await Client.findOne({phone: client_phone})
        if (!client) {
            throw Error("No client exists with this phone number")
        }
        if (typeof(total_entered) !== 'number') {
            throw Error("Total must be a number")
        }
        // get Current date
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`
        }
        if (month < 10) {
            month = `0${month}`
        }
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if (hours >= 12) {
            hours = hours-12
        }
        if (hours < 10) {
            hours = `0${hours}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        let time = `${hours}:${minutes}:${seconds}`
        // This arrangement can be altered based on how we want the date's format to appear.
        const created_at = `${time} - ${day}/${month}/${year}`
        if (paid_with === 'Loyalty Points') {
            if (client.loyalty_points < neededLoyaltyPoints) {
                throw Error("Client doesn't have enough loyalty points")
            }
            const order = await Order.create({
                user_id: user.id,
                client_id: client.id,
                paid_with:paid_with,
                total:total_entered,
                created_at: created_at
            })

            const clientLoyaltyPoints = client.loyalty_points
            const clientNewLoyalPoints = clientLoyaltyPoints - neededLoyaltyPoints
            
            const clientRedeemedPoints = client.redeemed_loyalty_points
            const clientNewRedeemedPoints = clientRedeemedPoints + neededLoyaltyPoints

            const clientLog = client.log
            clientLog.push(order)

            const updatedDataForClient = {
                log: clientLog,
                redeemed_loyalty_points: clientNewRedeemedPoints,
                loyalty_points: clientNewLoyalPoints
            }
            const updateClient = await Client.findOneAndUpdate({phone:client_phone}, updatedDataForClient)

            const userLog = user.log
            userLog.push(order)
            const updatedDataForUser = {
                log: userLog,
            }
            const updateUser = await User.findByIdAndUpdate(userId, updatedDataForUser)

            const clientAfterUpdate = await Client.findOne({phone: client_phone})
            const userAfterUpdate = await User.findById(userId)
            const orderAfterUpdate = order
            res.status(200).json({orderAfterUpdate, clientAfterUpdate, userAfterUpdate})
            return 0
        }
        if (paid_with === 'EGP') {
            const order = await Order.create({
                user_id: user.id,
                client_id: client.id,
                total:total_entered,
                created_at: created_at,
                paid_with: paid_with
            })
            const loyaltyPoints = order.total * order.loyalty_points_per_egp
            await Order.findByIdAndUpdate(order.id, { loyalty_points_added:loyaltyPoints })
            const orderAfterUpdate = await Order.findById(order.id)
    
            
            const clientAmount = client.amount_spent
            const clientNewAmount = clientAmount + total_entered
            const clientLoyaltyPoints = client.loyalty_points
            const clientNewLoyalPoints = clientLoyaltyPoints + loyaltyPoints
            const clientLog = client.log
            clientLog.push(orderAfterUpdate)
            const updatedDataForClient = {
                log: clientLog,
                amount_spent: clientNewAmount,
                loyalty_points: clientNewLoyalPoints
            }
            const updateClient = await Client.findOneAndUpdate({phone:client_phone}, updatedDataForClient)
    
            const userLog = user.log
            userLog.push(order)
            const updatedDataForUser = {
                log: userLog,
            }
            const updateUser = await User.findByIdAndUpdate(userId, updatedDataForUser)
    
            const clientAfterUpdate = await Client.findOne({phone: client_phone})
            const userAfterUpdate = await User.findById(userId)
    
            res.status(200).json({orderAfterUpdate, clientAfterUpdate, userAfterUpdate})
            return 0
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().sort({createdAt: -1})
        if (!allOrders || allOrders.length === 0) {
            throw Error("No Orders Yet")
        }
        res.status(200).json(allOrders)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getClientOrders = async (req, res) => {
    const client_phone = req.params.phone
    try {
        const client = await Client.findOne({phone:client_phone})
        if (!client) {
            throw Error("No client with this number")
        }
        const orders = await Order.find({client_id:client.id})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getOrder = async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findById(orderId)
        if (!order) {
            throw Error("Order does not exist")
        }
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(404).json({error:error.message})
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id
    try {
        const orderDelete = await Order.findByIdAndDelete(orderId)
        if (!orderDelete) {
            throw Error("Something went wrong when deleting")
        }
        res.status(200).json({message:"Order Deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getClientOrders,
    getOrder,
    deleteOrder
}