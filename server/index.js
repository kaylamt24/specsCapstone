require('dotenv').config()
const {SERVER_PORT} = process.env


const express = require('express')
const cors = require('cors')



app = express()
app.use(express.json())
app.use(cors())

const{createSavedItems, retrieveSavedItems} = require('./controllers/wishlistItems')

const {register, login} = require('./controllers/authenticated')
const {isAuthenticated} = require('./middleware/isAuthenticated')


app.post('/register', register)
app.post('/login', login)


const {User} = require('./models/user')
const {SavedItems} = require('./models/savedItems')
const {DeletedItems} = require('./models/deletedItems')
const { sequelize } = require ('./util/database')

User.hasMany(SavedItems)
User.hasMany(DeletedItems)
SavedItems.belongsTo(User)
DeletedItems.belongsTo(User)

app.post('/savedItems', isAuthenticated, createSavedItems)
app.get('/savedItems/:userId', retrieveSavedItems)
app.get('/savedItems', isAuthenticated, retrieveSavedItems)


// app.listen(5000, () => console.log(`running on 5000`))

// sequelize.sync({force: true})

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`db sync successful & server running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err, 'db error'))