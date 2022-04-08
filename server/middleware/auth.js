const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
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
    try{
        const user = await User.findOne({_id:Token.userId});
        if(!user){
            throw new Error("User not found");
        }
        if(user.status == "logout"){
            throw new Error("User logged out");
        }
    }catch(err){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = Token.userId;
    next();
}