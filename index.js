const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User.js');

const server = express();
server.use(cors());
server.use(express.json());

mongoose.connect('mongodb+srv://Bhakti:Bhakti%4023@cluster0.exrbep9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));

server.post('/register', async (req, res) => {
    try {
        const { fullName, userName, age, password } = req.body;
        const userExist = await User.findOne({ userName });
        if (userExist) {
            return res.json({
                status: false,
                message: 'User already exists'
            });
        }

        const userObj = new User({ fullName, userName, age, password });
        await userObj.save();
        res.json({
            status: true,
            message: 'User registered successfully'
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

server.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userExist = await User.findOne({ userName });
        if (!userExist) {
            return res.json({ status: false, message: 'User not found!' });
        }
        if (password !== userExist.password) {
            return res.json({ status: false, message: 'Invalid password' });
        }
        res.json({ status: true, message: 'Login successful' });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

server.listen(8055, () => {
    console.log('Server is running on port no. 8055');
});