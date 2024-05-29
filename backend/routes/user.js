const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user_model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const SALT = parseInt(process.env.SALT);



router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username) return res.status(400).json({ error: "No username provided" });
    if (!password) return res.status(400).json({ error: "No password provided" });

    try {
        const hashedPassword = await bcrypt.hash(password, SALT);
        await User.create({
            username: username,
            password: hashedPassword
        });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ error: `${username} Couldn't add a user ` });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid username or password" });

        // Generate JWT
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "success", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error logging in" });
    }
});







console.log("User router loaded");
module.exports = router;
