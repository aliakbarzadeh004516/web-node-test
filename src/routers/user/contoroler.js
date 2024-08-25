const express = require('express');
const User = require('../../models/User');
const contoroler = require('./../contoroler');
const _ =require("lodash");
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = new (class extends contoroler{
    getdata(req,res){
        const {_id , password , ...temp} =  req.user._doc;
        const data = {...temp};
        this.response({
            res,
            message : "data is :",
            data 
        })
    }

    async edit(req,res){
        await this.User.updateOne({email : req.user.email},
            {$set : {name :req.body.name}}
        )
        const data  = {name :req.body.name ,email: req.user.email }

        this.response({
            res,
            message : "user edited successfuly",
            data 
        })
    }
    async chengPassword(req,res){
        var salt =await bcrypt.genSalt(10); 
        var password =await bcrypt.hash(req.body.password , salt);
        await this.User.updateOne({email : req.user.email},
            {$set : {password : password}}
        )
        this.response({
            res,
            message : "password chenged successfuly",
        })
    }
    async pay(req,res){
        if(req.body.amount <= 0 )
            return this.response({
                res,
                message : "amount have to be postive ",
                code: 400        
            })

        var newcash = parseFloat(req.user.cash) + req.body.amount;
        await this.User.updateOne({email:req.user.email},
            {$set:{cash :newcash}}
        )
        this.response({
            res,
            message : "payment done successfuly",
            data : {email : req.user.email , newcash}
        })

    }


    async withdrawal(req,res){
        var newcash = parseFloat(req.user.cash) - req.body.amount;
        if(newcash < 0 )
            return this.response({
                res,
                message : "insufficient inventory",
                code: 400        
            })

        await this.User.updateOne({email:req.user.email},
            {$set:{cash :newcash}}
        )
        this.response({
            res,
            message : "withdrawal done successfuly",
            data : {email : req.user.email , newcash}
        })

    }

    async delete(req,res){
        await this.User.findByIdAndDelete(req.user._id);
        this.response({
            res,
            message : "user deleted successfuly"
        })
    }

    async buy(req,res){
        var newcash = parseFloat(req.user.cash) - req.article.price;
        if(newcash < 0 )
            return this.response({
                res,
                message : "insufficient inventory",
                code: 400        
            })
        await this.User.updateOne({email:req.user.email},
            {$set:{cash :newcash}})
        var article = new this.Article(_.pick(req.article ,['price' , 'name' , 'about']));
        article.owner = req.user._id;
        await article.save();
        await this.User.updateOne({email:req.user.email},
            {$push:{assets: article}}
        ) 
        const owner = await this.User.findById(req.article.owner);
        newcash = parseFloat(owner.cash) + req.article.price;
        await this.User.updateOne({_id:req.article.owner},
            {$set:{cash :newcash}}
        ) 
        this.response({
            res,
            message : "buy done successfuly",
            data : {email : req.user.email , cash : newcash ,article} 
        })
        
    }

})()