const express = require('express');
const router = express.Router();
const chatServices = require('./services')
const Message = require('../../schema/message');
const User = require('../../schema/user')


router.get('/users/:id', async (req, res) => {
    try {
       let id = req.params.id 
       const data = await chatServices.getChatUsers( id );
       res.status(200).send({status:"success", error:false, message:"", data});

    }
    catch (e) {
        res.status(500).send({error:true, message:e?.message})
    }
})

router.post('/send-message', async (req, res) => {
    try {
       let body = req.body 
       const data = await chatServices.sendMessage( body );
       res.status(200).send({status:"success", error:false, message:"", data});
    }
    catch (e) {
        res.status(500).send({error:true, message:e?.message})
    }
})

router.post('/get-messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
        res.send(messages);
    }
    catch (e) {
        console.log('e',e)
        res.status(500).send({error:true, message:e?.message})
    }
})

router.get('/messages/:username', async (req, res) => {
    const { username } = req.params;
    const messages = await Message.find({ $or: [{ sender: username }, { receiver: username }] }).sort({ timestamp: -1 });
    res.send(messages);
});


router.get('/users', async (req, res) => {
    const users = await User.find().select('username');
    res.send(users);
  });




module.exports  = router