const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decode.indexOf, {
                attributes: {
                    exclude: ['password']
                }
            });

            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Not authorized, token failed',
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized, no token',
        });
    }
}