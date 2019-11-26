const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Authorization middleware
// before come to routers
const auth = async (req, res, next) => {
    try {
        //take token
        const token = req.header('Authorization').replace('Bearer ', '')
        // check token
        const decoded = jwt.verify(token, 'qawsedrf')
        // find user with this token
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        })
        // if not find user, throw exepsion 
        if (!user) {
            throw new Error()
        }
        // add token to req for routers
        req.token = token
        // add user to req for routers
        req.user = user
        // go to routers
        next()
    } catch (e) {
        res.status(401).send({
            error: 'Please authenticate.'
        })
    }
}

module.exports = auth