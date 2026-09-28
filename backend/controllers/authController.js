const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const validator = require('validator');

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof confirmPassword !== 'string'
        ) {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!validator.isEmail(email.trim())) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('REGISTER ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        if (!validator.isEmail(email.trim())) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('PROFILE ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
