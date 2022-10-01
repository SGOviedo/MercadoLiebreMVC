const {check, body} = require('express-validator');
const {loadUsers} = require('../data/dbModule')

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    check('surname')
        .notEmpty()
        .withMessage('El apellido es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio').bail()
        .custom( (value,{req}) => {
            let user = loadUsers().find(user => user.email === value);
            return user ? false : true
        }).withMessage('El email ya se encuentra registrado')
        ,
    check('pass')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    body('pass2')
        .notEmpty()
        .withMessage('Reingresá tu contraseña').bail()
        .custom( (value, {req}) => {
            return req.body.pass !== value ? false : true
        }).withMessage('Las contraseñas no coinciden'),
    check('terms')
        .isString('on')
        .withMessage('Debes aceptar las bases y condiciones'),
]