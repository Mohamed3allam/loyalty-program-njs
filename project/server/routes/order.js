require('dotenv').config()
const express = require('express')
const router = express.Router()

const { createOrder, getAllOrders, getClientOrders, getOrder, deleteOrder } = require('../controllers/orderController')
const { requireAuth } = require('../middlewares/requireAuth')
const { requireClientAuth } = require('../middlewares/requireClientAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')
const { default: mongoose } = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const crypto = require('crypto')
const User = require('../models/User')
const Client = require('../models/Client')
const Order = require('../models/Order')
const { default: parsePhoneNumberFromString } = require('libphonenumber-js')


const multer = require('multer')              // multer will be used to handle the form data.
const Aws = require('aws-sdk')
const { checkClient } = require('../middlewares/checkClient')


// creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }
})

// below variable is define to check the type of file which is uploaded
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter})

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET
})

router.post('/create-order', requireAuth, checkClient, createOrder)

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
router.post('/add-reciept-to-order/:orderId', upload.single('reciept-image'), (req, res) => {
    try {
        const order_id = req.params.orderId
        console.log(req.file) // to check the data in the console that is being uploaded
    
        // Defining the params variable to uplaod the photo
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
            Key:req.file.originalname,               // Name of the image
            Body:req.file.buffer,                    // Body which will contain the image in buffer format
            ACL:"public-read-write",                 // defining the permissions to get the public link
            ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
        };
    
        // uplaoding the photo using s3 instance and saving the link in the database.
        s3.upload(params, async (error, data) => {
            if (error) {
                res.status(500).json({error:error.message})
            }
            // If not then below code will be executed
            console.log(data)                      // this will give the information about the object in which photo is stored 
            
            // saving the information in the database. 
            const addingReciept = await Order.findByIdAndUpdate(order_id, {
                reciept_image_url:data.Location
            })
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
})

// Get all the product data from db 
router.get('/reciept-image', async (req, res) => {
    console.log(req.ip)
    try {
        req.    
        console.log("hello")
        const orders = await Order.find()
        
        // console.log(orders)
        res.send(orders)
    } catch (err) {
        res.send({ message: err.message, m:"not working" })
    }
})


// router.get('/reciepts/:id', async (req,res) => {
//     const reciept_id = req.params.id;
//     console.log(RecieptImageConn.readyState);
//     // Init Stream
//     (RecieptImageConn.readyState === 1) &&
//     new mongoose.mongo.GridFSBucket(RecieptImageConn, {bucketName: 'recieptImage'}).find().toArray(async (err, files) => {
//         try {
//             if (err) {
//                 throw Error(err)
//             }
//             if (!files || files.length === 0) {
//                 throw Error("No Files here")
//             }
//             // Read Output to browser
//             const readStream = await recieptGfs.openDownloadStream(`${reciept_id}`)
//             await readStream.pipe(res)
//         } catch (error) {
//             console.log(error)
//         }
//     })
// })

router.get('/all-orders', requireAuth,  getAllOrders)

router.get('/client-orders/:phone', requireAuth, getClientOrders)

router.get('/order/:id', requireAuth, getOrder)

router.delete('/delete-order', requireAuth, grantAccess('deleteAny', 'order'), deleteOrder)

module.exports = router