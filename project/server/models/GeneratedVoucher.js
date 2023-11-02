const mongoose = require('mongoose')

const Schema = mongoose.Schema

const generatedVoucherSchema = new Schema({

    // CUSTOMER ID IS NEEDED TO MAKE IT UNIQUE TO THIS CUSTOMER ONLY 
    customer_id: {
        type:String,
        required:true
    },

    // voucher id will be used to get the voucher data (egp to loyalty points .. to verify that only the vouchers in the list will be used)
    voucher_id: {
        type:String,
        required:true
    },

    // The Unique Id will be generated whenever the customer needs to give it to the cashier
    unique_id: {
        type:String,
        required:true,
        unique: true
    },

    redeemed: {
        type:Boolean,
        required: true,
        default:false
    },
    redeemed_at:{
        type:String,
        required:false
    },
    // Order id will be added after finishing the order steps and creating the order then it's id will be added here
    order_id:{
        type:String,
        required:false
    },

    expiresAt: {
        type: Date,
        default: new Date(Date.now() + (1 * 60 * 60 * 1000))
    }
    
}, { timestamps: true })

module.exports = mongoose.connection.useDb('SaleControl').model('GeneratedVoucher', generatedVoucherSchema)