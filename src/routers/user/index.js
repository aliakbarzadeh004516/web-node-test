const { checkArticle } = require('../../middlewares/auth');
const contoroler = require('./contoroler');
const validator = require('./validator');
const router = require('express').Router();

router.get(
    '/',
    contoroler.getdata
)
router.put(
    '/',
    validator.editvalidator(),
    contoroler.validate,
    contoroler.edit
)
router.put(
    '/password',
    validator.chengPasswordvalidator(),
    contoroler.validate,
    contoroler.chengPassword
)
router.put(
    '/pay',
    validator.payvalidator(),
    contoroler.validate,
    contoroler.pay
)
router.put(
    '/withdrawal',
    validator.withdrawalvalidator(),
    contoroler.validate,
    contoroler.withdrawal
)
router.delete(
    '/',
    contoroler.delete
)
router.post(
    '/buy/:id',
    checkArticle,
    contoroler.buy
)

module.exports = router;