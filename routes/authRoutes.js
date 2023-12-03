const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const dataModel = require('../dataModel');

// referral code
const refCode =666;


// login logic
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


// register logic
router.get('/register', (req, res) => {
    res.render('register', { title: 'register' })
})

router.post('/register', async (req, res) => {
    let { name, email, password, code } = req.body;
    try {
        const existingUser = await dataModel.User.findOne({ email });

        if (existingUser) {

            return res.status(400).render('register', { title: 'register', message: "Email address is already in use" })
        }

        // verify the access level
        if (code===refCode){
            code=refCode;
        }else{
            code = 111;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new dataModel.User({
            name,
            email,
            password: hashedPassword,
            level: code
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


// reset password logic
router.get('/resetPassword', (req, res) => {
    res.render('resetPassword', { title: 'Reset Password' });
});


router.post('/resetPassword', async (req, res) => {
    const { email, password, newPassword } = req.body;

    try {
        // find email
        const user = await dataModel.User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send('Password reset successful');
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
