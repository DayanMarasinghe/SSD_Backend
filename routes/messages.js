const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel')

router.post('/messages', async(req, res) => {
    //creating the JS object
    const messages = new Message({
        message: req.body.message,
        sender: req.body.sender
    })

    try{
        const saveMessage = await messages.save()
        res.status(201).json(saveMessage)
    } catch(err){
        res.status(400).json({
            message: err.message
        })
    }

})

router.get("/messagess", async (req, res) => {
    try {
      const groups = await Message.find();
      res.json(groups);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = router;