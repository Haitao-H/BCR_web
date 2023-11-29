const express = require('express');
const dbconnect = require('./dbConnect');
const mediaRoutes = require('./routes/mediaRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// connect to the database
dbconnect();

app.listen(3000, () => {
    console.log('Server listening on port 3000...(http://localhost:3000/)');
})

app.use('/', loginRoutes);
app.use('/', signupRoutes);

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




app.use('/media', mediaRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' })
})
