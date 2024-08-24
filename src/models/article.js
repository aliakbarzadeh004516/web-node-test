const mongoose = require('mongoose');
const  timestamp = require("mongoose-timestamp")

const articleSchima = mongoose.Schema({
    name:{type:String , required : true},
    price : {type :Number , required : true},
    about : {type: String , default : ""},
    owner: {type:mongoose.Schema.Types.ObjectId , ref :'User'},


},
{timestamp : true})

module.exports = mongoose.model('Article' , articleSchima);