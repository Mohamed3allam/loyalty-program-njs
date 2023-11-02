'use-strict'

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
const voucherRoutes = require('./routes/voucher')
const generatedVoucherRoutes = require('./routes/generatedVoucher')
const loyaltyPointsRoutes = require('./routes/loyalty')
const path = require('path')
const Order = require('./models/Order')

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
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use(express.static((path.join(__dirname, '../admin2'))))


// main routes
app.use('/user-auth', userAuthRoutes)
app.use('/users', userRoutes)
app.use('/user-profile', profileRoute)

app.use('/clients', clientRoutes)

app.use('/orders', orderRoutes)
app.use('/vouchers', voucherRoutes)
app.use('/generated-vouchers', generatedVoucherRoutes)
app.use('/loyalty-control', loyaltyPointsRoutes)


app.get("*", function(req, res) {
    return res.sendFile(path.resolve(__dirname, '../admin2/build', 'index.html'));
});

// Calculating fibonacci number recursively
// function fibonacci(n, cb) {
//     if(n < 3) {
//       cb(1);
//       return;
//     }
//     var sum = 0;
//     function end(subN) {
//         if(sum !== 0) {
//             cb(sum + subN);
//         } else {
//             sum += subN;
//         }
//     }
//     // Start calculation of previous two numbers
//     fibonacci(n - 1, end);
//     fibonacci(n - 2, end);
//   }

//   fibonacci(parseInt(7), (result) => {
//     console.log(result) 
//   });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})