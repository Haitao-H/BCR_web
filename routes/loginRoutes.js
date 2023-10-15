const express = require('express')
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login', { title: 'login' })
})


router.post('/home', (req,res) => {
    const userData={
        email:req.body.email,
        password:req.body.password
    }
    console.log(req.body);
    res.render('home', { title: 'Home' })
    
});

module.exports = router;