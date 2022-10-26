// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {profile, update, remove} = require('../controllers/usersController');

/* /users */
router
    .get('/profile', profile)
    .put('/update', update)
    .delete('/remove', remove)

module.exports = router;
