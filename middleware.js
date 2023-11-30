// middleware
const isAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.render('login');
    }
}

module.exports = {isAuth};