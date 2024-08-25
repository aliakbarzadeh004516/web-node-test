const router = require('express').Router();
const authRouter = require("./auth");
const articleRuoter  = require("./article");
const {checkToken} = require("../middlewares/auth")
const userRouter = require('./user');


router.use('/article' , articleRuoter);
router.use('/auth',authRouter);
router.use('/user' , checkToken , userRouter);

module.exports = router;
