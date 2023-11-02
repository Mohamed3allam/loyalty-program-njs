const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    user_name: {
        type:String,
        required: [true, 'User is Undefined']
    },
    client: {
        type:Object,
        required: [true, 'Client is Undefined']
    },
    invoice_id:{
        type: String,
        required:[true, 'Something wrong with invoice id .. please try again'],
        unique:true
    },
    total: {
        type:Number,
        required:[true, 'Total is undefined']
    },
    paid_with: {
        type:String,
        enum:['EGP','Voucher_EGP'],
        required:[true, 'Payment method undefined'],
    },

    // If paid with EGP there will be LP added
    loyalty_points_added: {
        type:Number,
        required: false,
        default: 0
    },


    use_voucher: {
        type:Boolean,
        required: [true, 'Did you use voucher or not ?'],
        default:false
    },
    voucher_unique_id:{
        type:String,
        required:false
    },
    voucher_verified:{
        type:Boolean,
        required:false
    },
    paid_in_egp:{
        type:Number,
        required:false
    },


    reciept_image_url: {
        type:String,
        required:false
    },
    created_at: {
        type:String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.connection.useDb('CashierControl').model('Order', orderSchema)