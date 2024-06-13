
const jwt = require('jsonwebtoken');
const Secret = require('./Secret');


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.sendStatus(401); 
    }
  
    try {
     
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.userId;
  
      
      const secretDoc = await Secret.findOne({ userId }).sort({ createdAt: -1 }); // Get the latest secret
      if (!secretDoc) {
        return res.sendStatus(403); 
      }
  
      const secret = secretDoc.secret;
  
      
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.log('Error in token verification:', error);
      res.sendStatus(500);
    }
  };
  
  module.exports = authenticateToken;
  