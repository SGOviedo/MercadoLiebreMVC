const {validationResult} = require('express-validator');
const {loadUsers, storeUsers} = require('../data/dbModule');
const {hashSync} =require('bcryptjs');


module.exports = {
    register : (req,res) => {
        return res.render('userRegister')
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let newUser = {
                id :  loadUsers().length !== 0 ? loadUsers()[loadUsers().length - 1] + 1 : 1,
                ...req.body,
                pass : hashSync(req.body.pass, 10),
                pass2 : null,
                avatar : null
            }

            let usersModify = [...loadUsers(), newUser];

            storeUsers(usersModify)

            return res.redirect('/users/login')

        }else {
            return res.render('userRegister',{
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    login : (req,res) => {
        return res.render('userLogin')
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let {id, name, avatar} = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                name,
                avatar
            };

            req.body.remember && res.cookie('mercadoLiebre15',req.session.userLogin, {maxAge : 1000 * 60})


            return res.redirect('/');

        }else {
            return res.render('userLogin',{
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    profile : (req,res) => {
        
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);

        return res.render('userProfile',{
            user
        })
    },
    update : (req,res) => {
        return res.send(req.body)
    },
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    },
    remove : (req,res) =>{

    }
}