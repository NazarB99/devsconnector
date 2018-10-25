const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.use('/test',(req,res) => res.json({msg:'Users Works'}));

router.use('/register/users',(req,res) => {
    User.findOne({
        email:req.body.email
    }).then(user => {
      if (user){
          return res.status(400).json({email:'Email already exists'})
      }
      else{
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            avatar,
        });
      }
    })
});

module.exports = router;