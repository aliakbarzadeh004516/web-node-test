const app = require('express')();
const apiRouter = require("./src/routers");
require('./startup/db')()
require('./startup/middlewers')(app);

app.use("/api", apiRouter);




const port = process.env.port || 3000;

app.listen(port , ()=>{
    console.log(`app is listening to the port ${port}`);
})
