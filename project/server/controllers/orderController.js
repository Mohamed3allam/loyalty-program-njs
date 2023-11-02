require('dotenv').config()
const { default: mongoose } = require('mongoose')
const { GridFSBucket } = require('multer-gridfs-storage')
const Client = require('../models/Client')
const Order = require('../models/Order')
const User = require('../models/User')
const { parsePhoneNumberFromString, isPossiblePhoneNumber } = require('libphonenumber-js')
const Voucher = require('../models/Voucher')
const GeneratedVoucher = require('../models/GeneratedVoucher')
const LP = require('../models/LP')

const voucherCodeGenerator = () => {
    var possibleNum = "123456789";
    for (var i = 0; i < 6; i++) {
        coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(coupon)
    return coupon
}

const current_date = () => {
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
    if (hours > 12) {
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
    let full_date = `${day}/${month}/${year}`
    let current_time = `${time} - ${full_date}`
    return current_time
}

const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


const createOrder = async (req, res, next) => {
    
    let { total_entered, paid_with, use_voucher } = req.body
    const client_phone = req.client.phone
    const userId = req.user.id
    try {
        
        total_entered = parseInt(total_entered)
        if (!client_phone || !total_entered || !paid_with || typeof(use_voucher) !== 'boolean') {
            throw Error('All fields must be filled')
        }
        const user = await User.findById(userId)
        if (!user) {
            throw Error("Something went wrong with order taker")
        }
        // VALIDATING PHONE NUMBER USING libphonenumber.js
        // function validatePhoneNumber(phone_being_tested) {
        //     const parsedPhoneNumber = parsePhoneNumberFromString(phone_being_tested, 'EG')
        //     if (!parsedPhoneNumber) {
        //         return false
        //     }
        //     return parsedPhoneNumber.isValid()
        // }
        // const isValidPhone = validatePhoneNumber(client_phone)
        // if (!isValidPhone) {
        //     throw Error("Not Valid Phone Number")
        // }
        // const phone_regex = /^2?01[0125][0-9]{8}$/
        // if (!phone_regex.test(client_phone)) {
        //     throw Error("Not Valid Egyptian Phone Number")
        // }
        if (typeof(total_entered) !== 'number') {   
            throw Error("Total must be a number")
        }
        const client = req.client
        
        if (use_voucher === true) {
            if (paid_with !== 'Voucher_EGP') {
                throw Error('Something went wrong with your order')
            }
            // Verify the generated voucher's code is valid
            const { unique_id } = req.body
            if (!unique_id) {
                throw Error('Please add your voucher code')
            }
            const generatedVoucher = await GeneratedVoucher.findOne({unique_id:unique_id})
            if (!generatedVoucher) {
                throw Error('Voucher code is either expired or not valid')
            }
            //----------------------------------------------

            // Check if the voucher code has been used before in any orders
            const generated_voucher_used = await Order.findOne({voucher_unique_id: unique_id})
            if (generated_voucher_used) {
                throw Error('This voucher code has been used before please generate another voucher.')
            }
            //----------------------------------------------

            // Check if the voucher exists 
            const voucher_id = generatedVoucher.voucher_id
            const voucher = await Voucher.findById(voucher_id)
            if (!voucher) {
                throw Error('Voucher may not be available .. please refresh your voucher list')
            }
            //----------------------------------------------

            // Check Client's loyalty points that it's enough to redeem the voucher
            const clientLoyaltyPoints = client.loyalty_points
            const voucherLoyaltyPoints = voucher.loyalty_points
            if (clientLoyaltyPoints < voucherLoyaltyPoints) {
                throw Error("Client doesn't have enough loyalty points to use this voucher")
            }
            if (total_entered < voucher.egp) {
                throw Error("Total is more than voucher EGP value .. please add a lower value voucher if possible")
            }
            let paid_in_egp = total_entered - voucher.egp
            
            let invoice_id = 'HM-VI' ;
            let fn=41;
            var possibleNum = "123456789";
            for (var i = 0; i < 4; i++) {
                fn += possibleNum.charAt(Math.floor(Math.random() * possibleNum.length));
            }
            invoice_id = invoice_id + fn;
            const order = await Order.create({
                user_id:user.id,
                user_name: `${user.name.firstName} ${user.name.lastName}`,
                client: {
                    id: client.id,
                    name: client.name,
                    phone: client.phone,
                    loyalty_points: client.loyalty_points
                },
                invoice_id:invoice_id,
                total:total_entered,

                paid_with:paid_with,

                use_voucher:true,
                voucher_unique_id:unique_id,
                voucher_verified:true,
                paid_in_egp: paid_in_egp,

                created_at: current_date()
            })

            const updateGeneratedVoucher = await GeneratedVoucher.findByIdAndUpdate(generatedVoucher.id, {
                redeemed: true,
                redeemed_at: current_date(),
                order_id: order.id
            })

            const oldVoucherRedemptionTimes = await Voucher.findById(generatedVoucher.voucher_id)
            const newRedemptionTimes = oldVoucherRedemptionTimes.redemption_times + 1
            const updateVoucherRedemptionTimes = await Voucher.findByIdAndUpdate(generatedVoucher.voucher_id, {
                redemption_times: newRedemptionTimes
            })

            const clientLog = await client.log
            clientLog.push(order)

            const clientNewLoyaltyPoints = clientLoyaltyPoints - voucherLoyaltyPoints
            console.log(clientNewLoyaltyPoints)

            const updatedDataForClient = {
                log: clientLog,
                loyalty_points: clientNewLoyaltyPoints
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
        if (use_voucher === false) {
            if (paid_with !== 'EGP') {
                throw Error('Something went wrong with your order')
            }
            const loyalty_percentage = await LP.findOne()
            const loyaltyPointsAdded = round(total_entered * loyalty_percentage.percentage, 2)

            let invoice_id = `HM-EI` ;
            let fn=41;
            var possibleNum = "123456789";
            for (var i = 0; i < 4; i++) {
                fn += possibleNum.charAt(Math.floor(Math.random() * possibleNum.length));
            }
            invoice_id = invoice_id + fn;

            const order_with_same_invoiceId_exists = await Order.findOne({invoice_id: invoice_id})
            if (order_with_same_invoiceId_exists) {
                throw Error('some error happened .. please try again')
            }

            const order = await Order.create({
                user_id:user.id,
                user_name: `${user.name.firstName} ${user.name.lastName}`,
                client: {
                    id: client.id,
                    name: client.name,
                    phone: client.phone,
                    loyalty_points: client.loyalty_points
                },
                invoice_id:invoice_id,
                total:total_entered,

                paid_with: paid_with,
                loyalty_points_added:loyaltyPointsAdded,

                created_at: current_date()
            })
    
            
            const clientAmount = client.amount_spent
            const clientNewAmount = clientAmount + total_entered
            const clientLoyaltyPoints = client.loyalty_points
            const clientNewLoyalPoints = clientLoyaltyPoints + loyaltyPointsAdded
            const clientLog = client.log
            clientLog.push(order)

            const updatedDataForClient = {
                log:clientLog,
                amount_spent: clientNewAmount,
                loyalty_points: clientNewLoyalPoints
            }

            await Client.findOneAndUpdate({phone:client_phone}, updatedDataForClient)

            const userLog = user.log

            userLog.push(order)
            const updatedDataForUser = {
                log: userLog,
            }
            
            await User.findByIdAndUpdate(userId, updatedDataForUser)
    
            const clientAfterUpdate = await Client.findOne({phone: client_phone})
            const userAfterUpdate = await User.findById(userId)
    
            res.status(200).json({order, clientAfterUpdate, userAfterUpdate})
        } else {
            throw Error("Invalid Payment method!")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({createdAt: -1})
        if (!orders || orders.length === 0) {
            throw Error("No Orders Yet")
        }
        console.log(orders.length)
        res.status(200).json(orders)
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
        const orders = await Order.find({client:client})
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