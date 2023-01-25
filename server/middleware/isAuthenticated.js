require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {

        const headerToken = req.get('Authorization')
        const error = new Error('Not Authenticated')
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
            throw error
        }

        let token
        
        try {
            
            token = jwt.verify(headerToken, SECRET)

        } catch (err) {
            err.statusCode = 500
            throw error
          
        }

        if (!token) {
            error.statusCode = 401
            throw error
        }

        next()

    }
}