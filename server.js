require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userAuthRoutes = require('./routes/userAuth')
const userRoutes = require('./routes/user')
const profileRoute = require('./routes/profile')
const clientRoutes = require('./routes/client')
const orderRoutes = require('./routes/order')

const app = express()
const port = process.env.PORT

// mongoose connection start
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    readPreference:'secondaryPreferred',
    maxPoolSize: 10,
    minPoolSize: 5,
}).then(() => {
    console.log('Connected to Database')
})

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())



// main routes
app.use('/user-auth', userAuthRoutes)
app.use('/users', userRoutes)
app.use('', profileRoute)
app.use('/clients', clientRoutes)
app.use('/orders', orderRoutes)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})