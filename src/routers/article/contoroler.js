const express = require('express');
const User = require('../../models/User');
const contoroler = require('./../contoroler');
const _ =require("lodash");
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = new (class extends contoroler{
    
   
    async creat(req,res){
        const article = new this.Article(_.pick(req.body , ['name',"price","about"]))
        article.owner = req.user; 
        await article.save();
        await this.User.updateOne({email:req.user.email},
            {$push:{assets : article._id}}
        ) 
        var data  = _.pick(article , ['name','price','_id',"about"]);
        data["owner"] = _.pick(req.user,['name','eamil']);
        this.response({
            res,
            message : "article created successfuly",
            data
        })
    }

    async delete(req,res){
        await this.Article.findByIdAndDelete(req.article._id);
        await this.User.updateOne({_id  : req.article.owner._id},
            {$pull : {assets : req.article._id}}
        ) 

        this.response({
            res,
            message : 'article deleted successfuly',
            data  :{
                _id : req.article._id,
                name : req.article.name,
                price : req.article.price,
                about : req.article.about , 
                owner : {
                    email : req.article.owner.email,
                    name : req.article.owner.name
                }
            }
        })

    }
    async getdata(req,res){
        this.response({
            res,
            message : 'data is :',
            data  :{
                _id : req.article._id,
                name : req.article.name,
                price : req.article.price,
                about : req.article.about , 
                owner : {
                    email : req.article.owner.email,
                    name : req.article.owner.name
                }
            }
        })
    }
    async edit (req,res){
        await this.Article.updateOne({_id : req.article.id},
            {$set:{about : req.body.about , price : req.body.price}}
        )
        var data1  = _.pick(req.body , ['price',"about"]);
        var data2  = _.pick(req.article , ['name',"_id"]);
        data2['owner']=_.pick(req.article.owner,["name",'email']);
        this.response({
            res,
            message : "data updated successfuly ",
            data : {...data1 , ...data2}
        })
    }

})()