const LoyaltyPoints = require('../models/LP')

const test = async() => {
    const docNum = await LoyaltyPoints.countDocuments()
    console.log(docNum)

}
test()
// const addLoyaltyPoints = async (req, res) => {
//     const { loyalty_points, egp } = req.body
//     try {
//         if (!req.user) {
//             throw Error('You must sign in first')
//         }
//         if (req.user.role !== 'Super Admin') {
//             throw Error('You are not authorized to do this action')
//         }
        
        
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({error:err.message})
//     }
// }
const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const current_date = () => {
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
    if (hours > 12) {
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
    let full_date = `${day}/${month}/${year}`
    let current_time = `${time} - ${full_date}`
    return current_time
}

const updateLoyaltyPoints = async (req, res) => {
    const lpId = req.params.id
    let { loyalty_points, egp } = req.body
    loyalty_points = parseInt(loyalty_points)
    egp = parseInt(egp)
    const percentage = loyalty_points / egp;

    try {
        if (!req.user) {
            throw Error('You must sign in first')
        }
        if (req.user.role !== 'Super Admin') {
            throw Error('You are not authorized to do this action')
        }
        if (!loyalty_points || !egp) {
            throw Error('All fields must be filled')
        }
        if (typeof(loyalty_points) !== 'number' || typeof(egp) !== 'number') {
            throw Error('Only Numbers accepted')
        }

        const loyaltyPointsDocument = await LoyaltyPoints.findById(lpId)


        if (!loyaltyPointsDocument) {
            const docNum = await LoyaltyPoints.find()
            console.log(docNum)
            if (docNum.length === 1) {
                throw Error('Only One Loyalty Points Controller can be added')
            }
    
            const loyalty = await LoyaltyPoints.create({
                egp: egp,
                loyalty_points: loyalty_points,
                percentage: round(percentage, 2),
                latest_update_date: current_date()
            })
            res.status(200).json({
                success:'Loyalty Points Added Successfully',
                loyalty:loyalty
            })
            return 0
        }

        const latestEGP = loyaltyPointsDocument.egp
        const latestLP = loyaltyPointsDocument.loyalty_points
        const latestPercentage = loyaltyPointsDocument.percentage

        const update = await LoyaltyPoints.findOneAndUpdate({}, {
            egp: egp,
            loyalty_points: loyalty_points,
            percentage: round(percentage, 2),
            latest_update:{
                egp:latestEGP,
                loyalty_points:latestLP,
                percentage:latestPercentage
            },
            latest_update_date: current_date()
        })
        if (!update) {
            throw Error('No Loyalty Controller found .. please add one')
        }
        const loyalty__points = await LoyaltyPoints.findOne()
        res.status(200).json({
            success:'Loyalty Points Updated Successfully',
            loyalty__points
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({error:err.message})
    }
}

const getLoyaltyPoints = async (req, res) => {
    try {
        const loyalty = await LoyaltyPoints.findOne()
        if(!loyalty){
            throw new Error("No Loyalty Points Found")
        }
        res.status(200).json(loyalty)
    }catch(e){
        res.status(404).json({error: e.message})
    }
}

module.exports = {
    updateLoyaltyPoints,
    getLoyaltyPoints
}