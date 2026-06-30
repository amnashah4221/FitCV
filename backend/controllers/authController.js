const User = require('../models/User');
const generateToken = require('../utils/generateToken');;


// Register user

const registerUser = async (req, res) => {
    try{
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' }); 
        }

        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        })
    }
        catch (error){
            res.status(500).json({ message: 'Server error', error: error.message })
        }
    }

    const loginUser = async (req, res) => {
        try{
            const { email, password } = req.body;   

            if(!email || !password){
                return res.status(400).json({ message: 'Please provide all required fields' });
            }   

            const user = await User.findOne({ email });
            if(!user){
                return res.status(404).json({ message: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);
            if(!isMatch){
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            })
        }
        catch (error){
            res.status(500).json({ message: 'Server error', error: error.message })
        }   
    }

    const getUserProfile = async (req, res, next) => {
        try{
            const user = await User.findById(req.user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        }
        catch (error){
            res.status(500).json({ message: 'Server error', error: error.message })
        }
    }

    module.exports = {registerUser, loginUser, getUserProfile};
