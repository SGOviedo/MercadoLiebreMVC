const {check, body} = require('express-validator');
const {loadUsers} = require('../data/dbModule');
const {compareSync} = require('bcryptjs');

module.exports = [
 
    check('email')
        .notEmpty()
        .withMessage('El email es obligatorio'),
    body('pass')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .custom( (value,{req}) => {
            let user = loadUsers().find(user => user.email === req.body.email && compareSync(value, user.pass) );
            return !user ? false : true
        }).withMessage('Credenciales inválidas'),
  
]