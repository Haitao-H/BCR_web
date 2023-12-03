const express = require('express');
const session = require('express-session');
const dbconnect = require('./dbConnect');
const path = require('path');
const middleware = require('./middleware');
const mediaRoutes = require('./routes/mediaRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the database
dbconnect();

// session config
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


app.listen(3000, () => {
    console.log('Server listening on port 3000...(http://localhost:3000/)');
})

app.use('/', authRoutes);
app.use('/media', mediaRoutes);
// app.use('/media', middleware.isAuth, mediaRoutes);
app.use('/upload', uploadRoutes)

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to BCR' })
})

app.get('/home', (req, res) => {
    if(req.session.user){
        const userInfo = {
            name: req.session.user.name,
            email: req.session.user.email
        };
        console.log(userInfo);
        return res.render('home', { title: 'Home', userInfo: userInfo})
    }
    res.render('home', { title: 'Home' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' })
})
