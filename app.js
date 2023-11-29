const express = require('express');
const dbconnect = require('./dbConnect');
const mediaRoutes = require('./routes/mediaRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// connect to the database
dbconnect();

// middleware
const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        return res.render('login');
    }
}

app.listen(3000, () => {
    console.log('Server listening on port 3000...(http://localhost:3000/)');
})

app.use('/', loginRoutes);
app.use('/', registerRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to BCR' })
})



app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' })
})




app.use('/media', isAuth, mediaRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' })
})
