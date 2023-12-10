const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const dataModel = require('../dataModel');


const indexPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('index', { title: 'Welcome to BCR' })
    }
}

// check login session and redirect to home page
const loginCheck = (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('login', { title: 'login' });
    }
}

// render to register page
const renderRegister = (req, res) => {
    res.render('register', { title: 'register' })
}

// render to reset page
const renderReset = (req, res) => {
    res.render('resetPassword', { title: 'Reset Password' });
}

// register logic
const registerPost = async (req, res) => {
    let { name, email, password, code } = req.body;
    try {
        const existingUser = await dataModel.User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('register', { title: 'register', message: "Email address is already in use" })
        }
        // classify the user access level
        if (code == dataModel.refCode) {
            code = "admin";
        } else {
            code = "member";
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new dataModel.User({
            name,
            email,
            password: hashedPassword,
            level: code
        });
        user.save()
            .then(() => {
                console.log('User registered successfully');
                res.redirect('/login');
            })
    } catch (err) {
        console.error(err);
        res.render('register', { title: 'register', message: "Registration failed, Please Try Again" });
    }
}

// login logic
const loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check the user email
        const user = await dataModel.User.findOne({ email: email });
        if (!user) {
            return res.status(401).render('login', { title: 'login', message: "no account match" });
        }
        // check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // user already log in, add user info to the session, and redirec to home page
            req.session.user = user;
            res.redirect('/home');
        } else {
            res.status(401).render('login', { title: 'login', message: "wrong password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { title: 'login', message: "login failed, please try again" });
    }
}

// reset password logic
const resetPost = async (req, res) => {
    const { name, email, newPassword } = req.body;
    try {
        // check the user email
        const user = await dataModel.User.findOne({ email });
        if (!user) {
            return res.status(404).render('resetPassword', { message: "no account match" });
        }
        // cehck the name for this user
        const passwordMatch = await bcrypt.compare(newPassword, user.password);
        if (name != user.name) {
            return res.status(401).render('resetPassword', { message: "wrong name" });
        }
        // update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).render('login', { title: 'login', message: "Reset Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).render('resetPassword', { message: "Internal Server Error, Please Try Again" });
    }
}

// logout(destroy session)
const logoutPost = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/');
    })
}


module.exports = {
    indexPage, renderRegister, renderReset, loginCheck, registerPost, logoutPost, loginPost, resetPost
};