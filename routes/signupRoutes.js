const express = require('express')
const router = express.Router();


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'signup' })
})

router.post('/login',(req, res) => {
    console.log(req.body);
    const userData={
        name:req.body.username,
        password:req.body.password,
        password2:req.body.password_again
    }

    console.log(userData);
    res.render('login', { title: 'Login' })
});


module.exports = router;