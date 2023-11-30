const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const dataModel = require('../dataModel');

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('login', { title: 'login' });
    }
})

router.post('/logout', (req, res)=> {
    req.session.destroy((err)=>{
        if(err) console.log(err);
        res.redirect('/');
    })
})

router.post('/home', async (req, res) => {
    const { email, password } = req.body;

    try {
        // check the user in database
        const user = await dataModel.User.findOne({ email: email });

        if (!user) {
            // no account match
            return res.status(401).render('login', { title: 'login', message: "no account match"});
            
        }
        console.log("account match")

        // check password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // user already log in
            req.session.user = user;
            //res.send('log in success');
            res.redirect('/home');
        } else {
            res.status(401).render('login', { title: 'login', message: "wrong password"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('log in failed');
    }

});


router.get('/register', (req, res) => {
    res.render('register', { title: 'register' })
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await dataModel.User.findOne({ email });

        if (existingUser) {

            return res.status(400).render('register', { title: 'register', message: "Email address is already in use" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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
    } catch (err) {
        console.error(err);
        console.log('Registration failed');
        res.render('register', { title: 'register' });
    }
});


module.exports = router;
