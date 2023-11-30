const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dataModel = require('../dataModel'); 


router.get('/resetPassword', (req, res) => {
    res.render('resetPassword', { title: 'Reset Password' });
});


router.post('/', async (req, res) => {
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
