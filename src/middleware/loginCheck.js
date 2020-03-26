const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
    if (req.cookies.jwt) {
        passport.authenticate('local-jwt', { session: false }, (err, user, info) => {
            if (user) {
                next();
            } else {
                res.json({
                    isLoggedIn: false,
                    name: '',
                    message: info.message
                });
            }
        })(req, res, next);
    } else {
        res.json({
            isLoggedIn: false,
            name: '',
            message: '로그인 후 이용해주시기 바랍니다.'
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (req.cookies.jwt) {
        passport.authenticate('local-jwt', { session: false }, (err, user, info) => {
            if (user) {
                res.json({
                    isLoggedIn: true,
                    name: user.id,
                    message: '이미 로그인이 되어 있습니다.'
                });
            } else {
                next();
            }
        })(req, res, next);
    } else {
        next();
    }
};