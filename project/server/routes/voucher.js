const express = require('express')
const router = express.Router()

const { createVoucher, deleteVoucher, getAllVouchers, getVoucher, updateVoucher } = require('../controllers/voucherController')
const { requireAuth } = require('../middlewares/requireAuth')
const { grantAccess } = require('../middlewares/verifyAuthorization')
const multer = require('multer')              // multer will be used to handle the form data.
const Aws = require('aws-sdk')
const Voucher = require('../models/Voucher')


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
router.post('/create-voucher', requireAuth, createVoucher)

// FOR UPLOADING AN IMAGE FOR THE VOUCHER IF NEEDED
// , upload.single('voucher-image'), async(req, res, next) => {
//     try {
//         if (!req.file) {
//             throw Error('You must upload an image')
//         }
//         console.log(req.file) // to check the data in the console that is being uploaded
    
//         // Defining the params variable to uplaod the photo
//         const params = {
//             Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
//             Key:'vouchers/' + req.file.originalname, // Name of the image
//             Body:req.file.buffer,                    // Body which will contain the image in buffer format
//             ACL:"public-read-write",                 // defining the permissions to get the public link
//             ContentType:"image/*"                    // Necessary to define the image content-type to view the photo in the browser with the link
//         };
    
//         // uplaoding the photo using s3 instance and saving the link in the database.
//         s3.upload(params, async (error, data) => {
//             if (error) {
//                 res.status(500).json({error:error.message})
//             }
//             // If not then below code will be executed
//             console.log(data)                      
//             // this will give the information about the object in which photo is stored 
//             req.file.location = data.Location
//             next()
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error:error.message})
//     }
// }

router.get('/all-vouchers', getAllVouchers)

router.get('/voucher/:id', requireAuth, getVoucher)

router.put('/update-voucher/:id', requireAuth, updateVoucher)
router.delete('/delete-voucher/:id', requireAuth, deleteVoucher)

module.exports = router