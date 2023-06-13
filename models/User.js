const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:Object,
        firstName: {
            type:String,
            required: true
        },
        lastName: {
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true,
        maxLength:11
    },
    role: {
        type:String,
        required: true,
        default:'Admin',
        enum: ['Admin', 'Super Admin'],
    },
    log: {
        type:Array,
        required: false
    },
    user_created_at:{
        type:String,
        required: true
    }
}, { timestamps: true })





// Static signup method
userSchema.statics.signup = async function(user_id, name, email, password, phone, role, log, user_created_at) {
    // Validation
    if (!name || !email || !password || !phone || !role) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error('Not Valid Email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    const emailExists = await this.findOne({ email: email })
    if (emailExists) {
        throw Error('Email is already in use')
    }
    const userIdExists = await this.findOne({ user_id: user_id })
    if (userIdExists) {
        throw Error("User Id Exists check db")
    }
    if (phone.length > 11) {
        throw Error("Phone number not valid")
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
    user_created_at = `${time} - ${day}/${month}/${year}`; // "17-6-2022"

    // create user
    const user = await this.create({ user_id, name, email, password: hash, phone, role, log, user_created_at })
    return user
}



// Static Login method
userSchema.statics.login = async function( email, password ) {
    // validation
    if ( !email || !password ) {
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({ email: email })
    if (!user) {
        throw Error("Email doesn't exist")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Wrong Password")
    }
    return user
}

module.exports = mongoose.connection.useDb('UserControl').model('User', userSchema)