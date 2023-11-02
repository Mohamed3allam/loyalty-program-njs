const Client = require('../models/Client')
const jwt = require('jsonwebtoken');

// create token for the user
const createToken = (_id, name, phone, loyalty_points, amount_spent, created_at) => {
    return jwt.sign({ _id:_id, name:name, phone:phone, loyalty_points:loyalty_points, amount_spent:amount_spent, created_at: created_at }, process.env.JWT_CLIENT_SECRET, { expiresIn: '3d'})
}

const signupClient = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        const client = await Client.signup(name, phone, password);
        const token = createToken(client._id, client.name, client.phone, client.loyalty_points, client.amount_spent, client.created_at);
        res.status(200).json({token, client})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const loginClient = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const client = await Client.login( phone, password )
        const token = createToken(client._id, client.name, client.phone, client.loyalty_points, client.amount_spent, client.created_at)
        res.status(200).json({ token, client })
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({createdAt: -1})
        if (!clients) {
            throw Error("There are no clients")
        }
        res.status(200).json(clients)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const getClient = async (req, res) => {
    try {
        const clientPhoneNumber = req.params.phone;
        const client = await Client.findOne({phone: `2${clientPhoneNumber}`})
        if (!client) {
            throw Error("No client with this phone number")
        }
        res.status(200).json(client)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getProfile = async (req, res) => {
    try {
        const clientAuthenticated = req.client
        const client = await Client.findById(clientAuthenticated.id)
        if (!client) {
            throw Error("No User is Authenticated")
        }
        res.status(200).json(client)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const updatedData = req.body
        if (updatedData.phone) {
            const phone_number_exists = await Client.findOne({phone: updatedData.phone})
            if (phone_number_exists) {
                throw Error("Client with same phone number exists")
            }
        }
        const client = await Client.findByIdAndUpdate(clientId, updatedData)
        if (!client) {
            throw Error("No client with these data")
        }
        const updatedClient = await Client.findById(clientId)
        res.status(200).json(updatedClient)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleteClient = await Client.findByIdAndDelete(clientId)
        res.status(200).json({message: 'Client Deleted Successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    signupClient,
    loginClient,
    getAllClients,
    getClient,
    getProfile,
    updateClient,
    deleteClient
}