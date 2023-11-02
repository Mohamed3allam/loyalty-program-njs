const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LPSchema = new Schema({

    egp:{
        type:Number,
        required:true
    },

    loyalty_points:{
        type:Number,
        required:true
    },

    percentage: {
        type:Number,
        required:true
    },

    latest_update:{
        egp:{
            type:Number,
            required:false
        },
        loyalty_points:{
            type:Number,
            required:false
        },
        percentage: {
            type:Number,
            required:false
        }
    },
    latest_update_date:{
        type:String,
        required:true
    }
    
}, { timestamps: true, })

module.exports = mongoose.connection.useDb('SaleControl').model('LoyaltyPoints', LPSchema)