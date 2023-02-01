require('dotenv').config()
const {SERVER_PORT} = process.env


const express = require('express')
const cors = require('cors')



app = express()
app.use(express.json())
app.use(cors())

const{createSavedItems, retrieveSavedItems, deleteSavedItems, retrieveDeletedItems} = require('./controllers/wishlistItems')
const {scraper} = require('./controllers/scraperThree')

const {register, login} = require('./controllers/authenticated')
const {isAuthenticated} = require('./middleware/isAuthenticated')


app.post('/register', register)
app.post('/login', login)



const {User} = require('./models/user')
const {SavedItems, DeletedItems} = require('./models/savedItems')
const { sequelize } = require ('./util/database')

User.hasMany(SavedItems)
User.hasMany(DeletedItems)
SavedItems.belongsTo(User)
DeletedItems.belongsTo(SavedItems, {foreignKey: 'savedItemId', as: 'saved_items'})

app.post('/savedItems', isAuthenticated, createSavedItems)
app.get('/savedItems/:userId', isAuthenticated, retrieveSavedItems)
app.delete('/savedItems/:userId/:itemId', isAuthenticated, deleteSavedItems)
app.get('/deletedItems/:userId', retrieveDeletedItems)
app.get('/scraperThree',(req, res) => {
    let url = req.query.url;
    scraper(url).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error, 'error at get in index.js')
    })
}),






// app.listen(5000, () => console.log(`running on 5000`))

// sequelize.sync({force: true})    

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`db sync successful & server running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err, 'db error'))