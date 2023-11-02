const User = require('../models/User')


const getAll = async (req, res) => {
    try {
        const users = await User.find().sort({role: -1})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({role:'Admin'})
        res.status(200).json(admins)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const getSuperAdmins = async (req, res) => {
    try {
        const superAdmins = await User.find({role:'Super Admin'})
        res.status(200).json(superAdmins)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData)
        const updatedUser = await User.findById(userId)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await User.findByIdAndDelete(userId)
        res.status(200).json({message: 'User Deleted Successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAll,
    getAdmins,
    getSuperAdmins,
    getUser,
    getProfile,
    updateUser,
    deleteUser
}