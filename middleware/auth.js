const jwt = require('jsonwebtoken')
const AdminSchema = require('../models/admin')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        const decoded = jwt.verify(token, "mavuno")
        const admin = await AdminSchema.findOne({ _id: decoded._id })

        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })

    }
}

module.exports = auth