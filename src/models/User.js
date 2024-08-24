const mongoose = require('mongoose');
const  timestamp = require("mongoose-timestamp")

const UserSchima = mongoose.Schema({
    name :{type : String , required: true},
    email :{type : String , required: true,unique:true},
    password :{type : String , required: true},
    usertype : {type: String , enum:['admin','seller','client'], default:'client'},
    cash: {type : Number , default : 0},
    assets:[{type:mongoose.Schema.Types.ObjectId , ref : 'Article'}]
},
{ timestamps: true })

module.exports = mongoose.model('User', UserSchima);