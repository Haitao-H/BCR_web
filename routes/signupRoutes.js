const express = require('express')
const router = express.Router();


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'signup' })
})

router.post('/signup',(req, res) => {
    console.log(req.body);
    const userData={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        repassword:req.body.repassword
    }

    console.log(userData);
    res.render('login', { title: 'Login' })
});


module.exports = router;