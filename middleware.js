const isAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.render('login');
    }
}

const reqQuery = (req, res, next) => {
    console.log(req.query);
    next();
}

module.exports = {isAuth, reqQuery};