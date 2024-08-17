const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAdminAuth = async (req, res, next) => {
    
    // check if user is authenticated
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];
    
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
        const { _id, role } = decodedToken; // Extract role from decoded token
        
        req.user = await User.findOne({ _id }).select('_id');
        req.decodedToken = decodedToken; // Save decoded token to a variable
        req.userRole = role; // Save user role to a variable

        // Check if user role is Admin
        if (role !== 'Admin') {
            return res.status(403).json({ error: 'Access Forbidden. Only Admins are allowed.' });
        }
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
};

module.exports = requireAdminAuth;
