import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).send("Authorization failed. No access token.");
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Could not verify token");
      }
      req.user = user;
    });
    next();
  };

module.exports = {
    authenticateToken
}