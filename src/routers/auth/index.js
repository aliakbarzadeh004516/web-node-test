const contoroler = require('./contoroler');
const validator = require('./validator');
const router = require('express').Router();

router.post(
    '/register',
    validator.registervalidatioen(),
    contoroler.validate,
    contoroler.register
)
router.post(
    '/login',
    validator.loginvalidatioen(),
    contoroler.validate,
    contoroler.login
)





module.exports = router;