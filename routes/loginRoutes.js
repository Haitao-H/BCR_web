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
            res.status(401).send('no account match');
            //console.log('no account match:'+email);
            return;
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
            console.log('Password does not match for email: ' + email);
            res.status(401).send('password wrong');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('log in failed');
    }

});


// ?????
router.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.send('user already log in');
    } else {
        res.send('user does not log in');
    }
});

module.exports = router;
