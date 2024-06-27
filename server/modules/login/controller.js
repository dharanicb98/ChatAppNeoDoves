const express = require('express');
const userServices = require('./services');
const User = require('../../schema/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
          return res.status(400).send({error:true, message:'Invalid email or password'});
        }
        const token = jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret');
        res.send({ token });
    }
    catch (e) {
        res.status(500).send({error:true, message:e?.message})
    }
})


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    }
    catch (e) {
      res.status(500).send({error:true, message:e?.message})
    }
})



module.exports  = router