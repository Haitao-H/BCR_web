const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dataModel = require('../dataModel');

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'signup' })
})

router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    try{
        const existingUser = await dataModel.User.findOne({email});

        if (existingUser) {
            return res.status(400).json({ error: 'Email address is already in use' });
          }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new dataModel.User({
        name,
        email,
        password: hashedPassword
        });
        console.log(user);

        user.save()
        .then(() => {
        console.log('User registered successfully');
        res.redirect('/login');
        })
    }catch(err) {
        console.error(err);
        console.log('Registration failed');
        res.render('signup', {title:'Signup'});
    }
    //res.render('login', { title: 'Login' })
});

module.exports = router;

