const contoroler = require('./contoroler');
const validator = require('./validator');
const router = require('express').Router();

const {checkToken , checkArticle, IsSeller} = require("./../../middlewares/auth")


router.post(
    "/creat",
    validator.creatvalidator(),
    contoroler.validate,
    checkToken,
    IsSeller,
    contoroler.creat
)
router.delete(
    '/:id',
    checkArticle,
    contoroler.delete
)
router.get(
    '/:id',
    checkArticle,
    contoroler.getdata
)
router.put(
    "/:id",
    validator.editvalidator(),
    contoroler.validate,
    checkArticle,
    contoroler.edit
)



module.exports = router;