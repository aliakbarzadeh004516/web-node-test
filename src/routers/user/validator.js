const validator = require('express-validator')
const check = validator.check;


module.exports = new class{
    editvalidator(){
        return[
            check("name").notEmpty()
            .withMessage('name validatioen error'),
        ];
    }
    chengPasswordvalidator(){
        return[
            check("password").notEmpty()
            .withMessage('password can not be empty'),
        ];
    }
    payvalidator(){
        return[
            check('amount').isFloat()
            .withMessage('amount validation error')
        ]
    }
    withdrawalvalidator(){
        return[
            check('amount').isFloat()
            .withMessage('amount validation error')
        ]
    }
}()