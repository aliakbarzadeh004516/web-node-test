const router = require('express').Router();
const authRouter = require("./auth");
const articleRuoter  = require("./article");
const {checkToken} = require("../middlewares/auth")

router.use('/article' , articleRuoter)
router.use('/auth',authRouter);

module.exports = router;
