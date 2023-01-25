require('dotenv').config()

const {User} = require('../models/user')
const {SavedItems} = require('../models/savedItems')




module.exports = {

    createSavedItems: async (req, res) => {
        try{
            const {item_url, item_name, item_picture, item_price, userId} = req.body
            await SavedItems.create({item_url, item_name, item_picture, item_price, userId})
            console.log('new item added to wishlist')
 
            res.sendStatus(200)
            console.log('new item added to wishlist')
        } catch (error){
            console.log(error, 'error at create saved item')
        }
    },


  retrieveSavedItems: async (req, res) => {
    console.log('RETREIVE SAVED ITEMS PART')
    try {
      const { userId } = req.params;

      const savedItems = await SavedItems.findAll({
        where: { userId: +userId },
        include: [
          {
            model: User
          },
        ],
      });
      res.status(200).send(savedItems);
      console.log('showing all saved items')
      return 
    } catch (error) {
      console.log(error, "Error at getAllSavedItems");
      res.sendStatus(400);
      return
    }
  },
};
