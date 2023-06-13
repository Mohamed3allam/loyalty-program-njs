const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: {
        type:String,
        required: true
    },
    client_id: {
        type:String,
        required: false
    },
    loyalty_points_per_egp: {
        type:Number,
        default: 0.2
    },
    total: {
        type:Number,
        required:true
    },
    paid_with: {
        type:String,
        enum:['EGP','Loyalty Points'],
        required:true,
    },
    loyalty_points_added: {
        type:Number,
        required: false,
        default: 0
    },
    created_at: {
        type:String,
        required: true
    }
}, { timestamps: true })

// orderSchema.statics.signup = async ( user, client, products, order_method, program, loyalty_points, total, shipping, created_at ) => {
//     if (!user_id || !products || !total ) {
//         throw Error("Something is missing")
//     }

//     // get Current date
//     const date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     if (day < 10) {
//         day = `0${day}`
//     }
//     if (month < 10) {
//         month = `0${month}`
//     }
//     let hours = date.getHours()
//     let minutes = date.getMinutes()
//     let seconds = date.getSeconds()
//     if (hours >= 12) {
//         hours = hours-12
//     }
//     if (hours < 10) {
//         hours = `0${hours}`
//     }
//     if (minutes < 10) {
//         minutes = `0${minutes}`
//     }
//     if (seconds < 10) {
//         seconds = `0${seconds}`
//     }
//     let time = `${hours}:${minutes}:${seconds}`
//     // This arrangement can be altered based on how we want the date's format to appear.
//     created_at = `${time} - ${day}/${month}/${year}`

//     const order = await this.create({ user_id, client_id, products, order_method, program, loyalty_points, total, shipping, created_at })
//     return order
// }

module.exports = mongoose.connection.useDb('CashierControl').model('Order', orderSchema)