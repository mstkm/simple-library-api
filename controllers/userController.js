const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch(error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false, 
                message: 'Invalid credentials',
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}