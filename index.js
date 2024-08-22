const app = require('express')();

require('./startup/db')()
require('./startup/middlewers')(app);




const port = process.env.port || 3000;

app.listen(port , ()=>{
    console.log(`app is listening to the port ${port}`);
})
