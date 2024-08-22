const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { name, email, password, gender } = req.body;

    const newuser = new User({ name, email, password, gender });

    try {
        const user = await newuser.save();
        res.send('User Registered Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            const temporary = {
                name: user.name,
                email: user.email,
                gender: user.gender,
                _id: user.id,
            };
            res.send(temporary);
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
