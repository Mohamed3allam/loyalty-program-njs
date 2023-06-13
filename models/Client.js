const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { parsePhoneNumberFromString, isPossiblePhoneNumber } = require('libphonenumber-js')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required: false,
        unique: true
    },
    password: {
        type:String,
        required:true,

    },
    log: {
        type:Array,
        required: false
    },
    loyalty_points: {
        type:Number,
        required:true,
        default: 0
    },
    redeemed_loyalty_points: {
        type:Number,
        required:false,
        default: 0
    },
    amount_spent:{
        type:Number,
        required: true,
        default: 0
    },
    created_at: {
        type:String,
        required: true
    }
}, { timestamps: true })

// Static signup method
clientSchema.statics.signup = async function(name, phone, password) {

    // Validation
    if (!name || !phone || !password) {
        throw Error("All fields must be filled")
    }

    console.log(name)
    console.log(name.length)
    if (name.length > 30) {
        throw Error('Name must not be more than 30 characters')
    }
    
    // Validating phone number
    function validatePhoneNumber(phone_being_tested) {
        const parsedPhoneNumber = parsePhoneNumberFromString(phone_being_tested, 'EG')
        if (!parsedPhoneNumber) {
            return false
        }
        return parsedPhoneNumber.isValid()
    }
    const isValidPhone = validatePhoneNumber(phone)
    if (!isValidPhone) {
        throw Error("Not Valid Phone Number")
    }
    const phone_regex = /^2?01[0125][0-9]{8}$/
    if (!phone_regex.test(phone)) {
        throw Error("Not Valid Egyptian Phone Number")
    }

    if (password.length < 6) {
        throw Error("Your password needs a minimum of 6 characters.")
    }
    if (password.search(/[a-z]/) == -1) {
        throw Error("Your password needs at least one lower case letter")
    }
    if (password.search(/[A-Z]/) == -1) {
        throw Error("Your password needs at least one upper case letter")
    }
    if (password.search(/[0-9]/) == -1) {
        throw Error("Your password needs a number")
    }
    const phoneExists = await this.findOne({ phone:`2${phone}` })
    if (phoneExists) {
        throw Error("this Phone Number already used")
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

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
    const created_at = `${time} - ${day}/${month}/${year}`; // "17-6-2022"

    // create user
    const client = await this.create({ name, phone:`2${phone}`, password:hash, created_at })
    return client
}


// Static Login method
clientSchema.statics.login = async function( phone, password ) {
    // validation
    if ( !phone || !password ) {
        throw Error("All fields must be filled")
    }
    const client = await this.findOne({ phone: `2${phone}` })
    
    if (!client) {
        throw Error("Invalid phone or password")
    }
    const match = await bcrypt.compare(password, client.password)
    if (!match) {
        throw Error("Invalid phone or password")
    }
    return client
}


module.exports = mongoose.connection.useDb('CashierControl').model('Client', clientSchema)