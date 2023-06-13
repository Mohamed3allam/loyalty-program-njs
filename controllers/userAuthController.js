const User = require('../models/User')
const jwt = require('jsonwebtoken')

// create token for the user
const createToken = (_id, _user_id, _name, _email, _phone, _role) => {
    return jwt.sign({ _id:_id, user_id:_user_id, name:_name, email:_email, phone:_phone, role:_role }, process.env.JWT_SECRET, { expiresIn: '7d'})
}

// sign up function
const signupUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    try {

        if (!name || !email || !password || !phone || !role) {
            throw Error("Fields not filled")
        }
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            throw Error("Email already exists")
        }
    
        let user_id;
        if (role === 'Admin') {
            let i=1;
            for(i;await User.findOne({user_id:`ADMIN${i}`});i++) {
                i = i++
                console.log('ADMIN' + i)
            }
            user_id = `ADMIN${i}`;
        }
        if (role === 'Super Admin') {
            let i=1;
            for(i;await User.findOne({user_id:`SUPER_ADMIN${i}`});i++) {
                i = i++
                console.log('SUPER_ADMIN' + i)
            }
            user_id = `SUPER_ADMIN${i}`;
        }
    
        const user = await User.signup(user_id, name, email, password, phone, role)
        const token = createToken(user._id, user.user_id, user.name, user.email, user.phone, user.role)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}




// login function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id, user.user_id, user.name, user.email, user.phone, user.role)
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    signupUser, 
    loginUser
}