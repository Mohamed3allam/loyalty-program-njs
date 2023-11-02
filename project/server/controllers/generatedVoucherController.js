const Client = require('../models/Client');
const GeneratedVoucher = require('../models/GeneratedVoucher')
const Voucher = require('../models/Voucher')


const expiration_date = () => {
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
    let hours = date.getHours() + 1
    let minutes = date.getMinutes()
    if (hours > 12) {
        hours = hours-12
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let time = `${hours}:${minutes}`
    let full_date = `${day}/${month}/${year}`
    let current_time = `${time} - ${full_date}`
    return current_time
}

const generateVoucher = async (req, res) => {
    try {
        if (!req.client) {
            throw Error('Something went wrong with authentication .. please try logging in again')
        }
        const client_id = req.client.id
        const { voucher_id } = req.body
        console.log(voucher_id)
        const client = await Client.findById(client_id)
        if (!client) {
            throw Error('Problem with authentication .. please logout and login again.')
        }
        const voucher = await Voucher.findById(voucher_id)
        if (!voucher) {
            throw Error("Seems like this voucher doesn't exist anymore .. please refresh your available vouchers" )
        }

        if (client.loyalty_points < voucher.loyalty_points) {
            throw Error("You don't enough loyalty points to use this voucher")
        }

        let unique_id = "";
        let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 8; i++) {
            unique_id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        console.log(unique_id)

        const unique_id_exists = await GeneratedVoucher.findOne({unique_id:unique_id})
        if (unique_id_exists) {
            throw Error('Something went wrong when generating the voucher .. please try again.')
        }

        const generatedVoucher = await GeneratedVoucher.create({
            customer_id:client_id,
            voucher_id:voucher_id,
            unique_id:unique_id,
        })
        res.status(200).json(generatedVoucher)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

const getAllRedeemedVouchers = async (req, res) => {
    const user = req.user
    try {
        if (!user) {
            throw Error('You must sign in')
        } 
        if (user.role !== 'Super Admin') {
            throw Error('You are not authorized to check this data')
        }
        const redeemedVouchers = await GeneratedVoucher.find({redeemed:true})
        if (!redeemedVouchers) {
            throw Error("No Vouchers has been redeemed yet")
        }
        res.status(200).json({redeemed_vouchers:redeemedVouchers})
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

module.exports = { generateVoucher, getAllRedeemedVouchers }