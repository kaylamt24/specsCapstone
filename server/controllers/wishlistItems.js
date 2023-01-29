require("dotenv").config();

const { User } = require("../models/user");

const { SavedItems, DeletedItems } = require("../models/savedItems");

module.exports = {
  createSavedItems: async (req, res) => {
    try {
      // const {item_url, userId} = req.body
      const { item_url, item_name, item_picture, item_price, userId } =
        req.body;

      await SavedItems.create({
        item_url,
        item_name,
        item_picture,
        item_price,
        userId,
      });
      console.log("new item added to wishlist");

      res.sendStatus(200);
      console.log("new item added to wishlist");
    } catch (error) {
      console.log(error, "error at create saved item");
    }
  },

  retrieveSavedItems: async (req, res) => {
    console.log("RETREIVE SAVED ITEMS PART");
    try {
      const { userId } = req.params;

      const savedItems = await SavedItems.findAll({
        where: { userId: +userId },
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).send(savedItems);
      console.log("showing all saved items");
      return;
    } catch (error) {
      console.log(error, "Error at getAllSavedItems");
      res.sendStatus(400);
      return;
    }
  },

  deleteSavedItems: async (req, res) => {
    console.log("deleted");
    try {
      const { userId, itemId } = req.params;

      const savedItems = await SavedItems.findOne({
        where: { userId: +userId, id: +itemId },

    
      });

      await DeletedItems.create({
        item_url: savedItems.item_url,
        item_name: savedItems.item_name,
        item_picture: savedItems.item_picture,
        item_price: savedItems.item_price,
        userId: savedItems.userId,
      });

      await SavedItems.destroy({ where: { userId: +userId, id: +itemId } });

      res.sendStatus(200);
      console.log("item deleted from wishlist");
    } catch (error) {
      console.log(error, "error at deleted saved item *WISHLISTITEMS.JS*");
      res.sendStatus(400);
    }
  },

  retrieveDeletedItems: async (req, res) => {
    console.log("RETREIVE DELETED ITEMS");
    try {
      const { userId } = req.params;

      const deletedItems = await DeletedItems.findAll({
        where: { userId: +userId },
 
      });
      res.status(200).send(deletedItems);
      console.log("showing all deleted items");
      return;
    } catch (error) {
      console.log(error, "Error at retrieveDeletedItems *WISHLISTITEMS.JS*");
      res.sendStatus(400);
      return;
    }
  },
};
