const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token){ return res.status(403).json({ error: "No token provided" });}
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                
                return res.json({ Error: "Invalid token" })
              
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
};


module.exports = verifyToken