const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        const userInfo = {
            name: req.session.user.name,
            email: req.session.user.email
        };
        console.log(userInfo);
        return res.render('home', { title: 'Home', userInfo: userInfo })
    }
    res.render('home', { title: 'Home' })
})

module.exports = router;