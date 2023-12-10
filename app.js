const express = require('express');
const session = require('express-session');
const dbconnect = require('./dbConnect');
const app = express();
const morgan = require('morgan');
const middleware = require('./middleware');
const mediaRoutes = require('./routes/mediaRoutes');
const authRoutes = require('./routes/authRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const homeRoutes = require('./routes/homeRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':date[local] :method :url :status :response-time ms'));

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
});

app.use('/', authRoutes);
// app.use('/media', mediaRoutes);
app.use('/media', middleware.isAuth, mediaRoutes);

app.use('/delete', permissionRoutes);
app.use('/upload', uploadRoutes);
app.use('/home', homeRoutes);
app.use('/contact', contactRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' })
});