const jwt = require("jsonwebtoken");
module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false; //we can rename isAuth whatever we want
        return next();
    }
    const token = authHeader.split(' ')[1];//we have "Authorization: Bear token" in the req, we want to get token here
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }
    let Token;
    try{
        Token = jwt.verify(token, 'my token secret');
    }catch (err){
        req.isAuth = false;
        return next();
    }
    if(!Token){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = Token.userId;
    next();
}