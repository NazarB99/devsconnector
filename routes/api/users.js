const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateUserRegisterInput = require('../../validation/register');
const validateUserLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: 'Users Works'}));

router.post('/register', (req, res) => {
    const {errors,isValid} = validateUserRegisterInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }
    
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            const errors = {email:'Email already exists'};
            return res.status(400).json({errors})
        }
        else {
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                })
            })

        }
    })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const {errors,isValid} = validateUserLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email}).then(user => {
        if (!user) {
            res.status(404).json({msg: 'User not found'})
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {id:user.id, name:user.name,avatar:user.avatar};

                jwt.sign(payload,keys.secretOrKeys,{expiresIn:3600},(err,token) =>{
                    res.json({
                        success:true,
                        token: 'Bearer ' + token
                    })
                })
            }
            else {
                res.status(400).json({msg: 'Password incorrect'})
            }
        })
    })
});

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) =>{
    return res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
    })
});

module.exports = router;