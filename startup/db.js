const mongoose = require('mongoose');
const config = require ('config');

module.exports = ()=>{
    mongoose.connect(config.get('db.address'))
    .then(()=>console.log('app connected successfuly to databace '))
    .catch((ex)=>console.log('app can not connect to databace'));
}