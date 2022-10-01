// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin, profile, update, logout, remove} = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const {userCheck} = require('../middlewares')

/* /users */
router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/profile', userCheck, profile)
    .put('/update/:id', update)
    .get('/logout', logout)
    .delete('/remove/:id', remove)

module.exports = router;
