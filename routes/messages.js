const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
var MessageAuthenticate = require("../middleware/messageAuth");

router.post("/messages", async (req, res) => {
  //creating the JS object
  const messages = new Message({
    message: req.body.message,
    encryptedMsg: req.body.encryptedMsg,
    sender: req.body.sender,
  });

  //Message authentication
  if (MessageAuthenticate(messages.message, req.body.encryptedMsg)) {
    try {
      const saveMessage = await messages.save();
      res.status(201).json(saveMessage);
    } catch (err) {
      res.status(400).json({
        code: 400,
        error: err.message,
      });
    }
  } else {
    res.status(401).json({
      code: 401,
      error: "Message authentication failed",
    });
  }
});

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
