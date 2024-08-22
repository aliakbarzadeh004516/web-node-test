const validator = require('express-validator')
const check = validator.check;


module.exports = new class{
    registervalidatioen(){
        return[
            check("name").notEmpty()
            .withMessage('name validatioen error'),
            check("password").notEmpty()
            .withMessage('password validatioen error'),
            check('email').isEmail()
            .withMessage('email validatioen error')
        ];
    }
    loginvalidatioen(){
        return[
            check("password").notEmpty()
            .withMessage('password validatioen error'),
            check('email').isEmail()
            .withMessage('email validatioen error')
        ];
    }
}()