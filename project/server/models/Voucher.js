const mongoose = require('mongoose')

const Schema = mongoose.Schema

const voucherSchema = new Schema({
    user_id: {
        type:String,
        required: true
    },
    // voucher_image_url:{
    //     type:String,
    //     required:[true, 'There must be an image for your voucher']
    // },
    title: {
        type: String,
        required:[true,'Title is required for your voucher']
    },
    egp: {
        type:Number,
        required:[true, "EGP is required"]
    },
    loyalty_points: {
        type: Number,
        required: [true, "Loyalty Points is required"]
    },
    redemption_times:{
        type:Number,
        required:true,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.connection.useDb('SaleControl').model('Voucher', voucherSchema)