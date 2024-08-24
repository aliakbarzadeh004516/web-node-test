const User = require('./../models/User');
const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');
const Article  =require('./../models/article');

module.exports = class {
    constructor(){
        autoBind(this);
        this.User = User;
        this.Article = Article;
        
    }


    validationbody(req,res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            var  Errors =[]; 
            result.array().forEach((item)=>{
                Errors.push(item.msg);
            })
            this.response({
                res,
                code:400,
                massage: "validation Error",
                data: Errors
            })
            return false
        }
        return true
    }
    

    validate(req,res,next){
        if(this.validationbody(req,res))
            next();
    }


    response({res,code=200,message,data={}}){
        res.status(code).json({
            message,
            data
        })
    }
}