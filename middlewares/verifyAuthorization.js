const { roles } = require('../helpers/roles')

const grantAccess = ( action, resource ) => {
    return async (req, res, next) => {
        try {
            console.log(`Verify Auth User ${req.user} End verify auth`)
            const permission = await roles().can(req.user.role)[action](resource)
            if (!permission.granted) {
                return res.status(401).json({error: 'You are not authorized to do this action'})
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = { grantAccess }