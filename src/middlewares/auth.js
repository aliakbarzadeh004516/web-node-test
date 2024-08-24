const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("./../models/User");
const Article = require('./../models/article')

async function checkToken(req,res,next) {   
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send("access denaed");
    }
    try{
        var decoded  =await jwt.verify(token , config.get('jwt_key'));
        const user =await User.findById(decoded);
        if(!user)
            return res.status(403).send("invalid token");  
        req.user = user;
    }catch{
        return res.status(403).send("invalid token");  
    }
    next();
    
}

async function checkArticle(req,res,next)  {
    var id =req.params.id;
    const article  = await Article.findById(id).populate("owner",'name email ');
    if(article){
        req.article = article; 
        return next(); 
    }   
    res.status(403).send("invalid Article ID"); 
}

function IsSeller (req,res,next){
    if(req.user.usertype != "seller"){
        return res.status(403).send('access denaed you have to be seller');
    }
    next();
}


module.exports = {checkToken,checkArticle,IsSeller}