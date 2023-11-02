const Voucher = require('../models/Voucher')

const createVoucher = async (req, res, next) => {
    const user_id = req.user.id;
    // const image_url = req.file.location
    console.log(req.body)
    const { title, egp, loyalty_points } = req.body;
    try {
        const voucher = await Voucher.create({
            user_id:user_id,
            title:title,
            egp: egp,
            loyalty_points: loyalty_points,
            // voucher_image_url:image_url
        });
        res.status(200).json({voucher})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find().sort({egp: 1})
        if (!vouchers) {
            throw Error("There are no vouchers")
        }
        res.status(200).json(vouchers)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucher = await Voucher.findById(voucherId)
        if (!voucher) {
            throw Error("No voucher with this id")
        }
        res.status(200).json(voucher)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const updateVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucherExist = await Voucher.findById(voucherId)
        if (!voucherExist) {
            throw Error("No voucher with these data")
        }
        const updatedData = req.body;
        console.log(updatedData)
        const voucher = await Voucher.findByIdAndUpdate(voucherId, updatedData)
        const updatedVoucher = await Voucher.findById(voucherId)
        res.status(200).json(updatedVoucher)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const deleteVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucherExist = await Voucher.findById(voucherId)
        if (!voucherExist) {
            throw Error("Voucher doesn't exist or already been deleted")
        }
        const deleteVoucher = await Voucher.findByIdAndDelete(voucherId)
        res.status(200).json({message: 'Voucher Deleted Successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createVoucher,
    deleteVoucher,
    getAllVouchers,
    getVoucher,
    updateVoucher
}