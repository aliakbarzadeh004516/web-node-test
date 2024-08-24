const validator = require('express-validator')
const check = validator.check;


module.exports = new class{

    creatvalidator(){
        return [
            check('name').notEmpty()
            .withMessage('name can not be empty'),
            check('price').isFloat()
            .withMessage('invalid  price ')
        ]
    }
    editvalidator (){
        return[
            check('price').isFloat()
            .withMessage('invalid  price ')
        ]
    }
}()