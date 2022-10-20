const {validationResult} = require('express-validator');
const {loadUsers, storeUsers} = require('../data/dbModule');
const {hashSync} =require('bcryptjs');
const db = require('../database/models');

module.exports = {
    register : (req,res) => {
        return res.render('userRegister')
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        const {name, surname, email, pass} = req.body
        if(errors.isEmpty()){

            db.User.create({
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                password : hashSync(pass, 10),
                rolId : 2
            }).then(user => {
                db.Address.create({
                    userId: user.id
                }).then( () => {
                    return res.redirect('/users/login')
                })
            }).catch(error => console.log(error))
            
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

            db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then(({id, name, avatar, rolId}) => {
                req.session.userLogin = {
                    id,
                    name,
                    avatar,
                    rol : rolId
                };
                req.body.remember && res.cookie('mercadoLiebre15',req.session.userLogin, {maxAge : 1000 * 60});
                
                return res.redirect('/');

            }).catch(error => console.log(error))

        }else {
            return res.render('userLogin',{
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    profile : (req,res) => {
        
        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                return res.render('userProfile',{
                    user
                })
            })
            .catch(error => console.log(error))

   
    },
    update : (req,res) => {

        const {name, surname, password} = req.body;

        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                db.User.update(
                    {
                        name,
                        surname,
                        password : password ? hashSync(password,10) : user.password,
                        avatar : req.file ? req.file.filename : user.avatar
                    },
                    {
                        where : {
                            id : req.session.userLogin.id
                        }
                    }
                ).then( () => {
                    return res.redirect('/users/profile')
                })
        
            }).catch(error => console.log(error))

      
    },
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    },
    remove : (req,res) =>{

    }
}