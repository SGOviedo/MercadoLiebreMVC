const {validationResult} = require('express-validator');
const {loadUsers, storeUsers} = require('../data/dbModule');
const {hashSync} =require('bcryptjs');


module.exports = {
    profile : (req,res) => {
        
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);

        return res.render('userProfile',{
            user
        })
    },
    update : (req,res) => {
        return res.send(req.body)
    },
    remove : (req,res) =>{

    }
}