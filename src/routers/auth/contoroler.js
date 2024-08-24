const express = require('express');
const User = require('../../models/User');
const contoroler = require('./../contoroler');
const _ =require("lodash");
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = new (class extends contoroler{
    
    async register(req,res){
        var user =await this.User.findOne({email:req.body.email});
        if(user){
            return this.response({
                res,
                message: "replace eamil",
                code:400
            })
        }
        user = new this.User(_.pick(req.body ,["name","email","password","usertype"]));
        const salt =await bcrypt.genSalt(10);
        user.password =await bcrypt.hash(user.password , salt);
        await user.save()
        this.response({
            res,
            message : "user registered successfuly",
            data:_.pick(user,["name","email",'usertype'])
        })
    }

    async login(req,res){
        var user = await this.User.findOne({email:req.body.email});
        if(!user){
            return this.response({
                res,
                code:400,
                message:'email pr password is not valid'
            });
        }
        var isvalid =await bcrypt.compare(req.body.password , user.password);
        if(!isvalid){
            return this.response({
                res,
                code:400,
                message:'email pr password is not valid'
            });

        }
        const id = String(user._id);
        const token =await jwt.sign(id,config.get('jwt_key'))
        this.response({
            res,
            message :"user login successfuly ",
            data : {token: token}
        })
    }


})()