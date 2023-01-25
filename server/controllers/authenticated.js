require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createToken = (username, id) => {
    return jwt.sign(
    {
        username,
        id
    },
    SECRET,
    {
        expiresIn: '2 days'
    }
)
}


module.exports = {

    register: async (req, res) => {
        console.log(`Hello, it's ready`)
            try {
              const {username, password, first_name, last_name, email} = req.body

              let foundUser = await User.findOne({where: {username, first_name, last_name, email}})

              if (foundUser) {
                res.status(400).send('Username is not available')

              } else {

                const salt = bcrypt.genSaltSync(10);

                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({username: username, hashedPass: hash, first_name, last_name, email})
                console.log('new user', newUser)

                const token = createToken(newUser.dataValues.username, newUser.dataValues.id, newUser.dataValues.first_name, newUser.dataValues.last_name, newUser.dataValues.email)
                console.log('token', token)
 
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    first_name: newUser.dataValues.first_name,
                    last_name: newUser.dataValues.last_name,
                    email: newUser.dataValues.email,
                    token,
                    exp
                })
                }
    }
    catch (error) {
        console.log(error, "error")
        res.status(400)
}
},

login: async (req, res) => {
    try {
        const {username, password} = req.body
        const foundUser = await User.findOne({where: {username}})
        
        if(foundUser){
            console.log(foundUser)
            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

        if (isAuthenticated){
            const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
            const exp = Date.now() + 1000 * 60 * 60 * 48
            res.status(200).send({
                username: foundUser.dataValues.username,
                userId: foundUser.dataValues.id,
                token,
                exp
            })
        } else {

            res.status(400).send('Password incorrect')
        }
        } else {

            res.status(400).send('No user with that name')
            
        }
    }     catch (error) {
        console.log(error, "error")
        res.status(400)
}
}
}