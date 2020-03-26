// 현재 JWT 방식을 사용하고 있으므로 엄밀히 따지면 Session이라는 이름은 어울리지 않는다.
// 하지만 JWT가 Session을 대체하기 때문에 이름을 변경하지는 않았다.

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('middleware/loginCheck');

// 로그인
router.post('/', (req, res, next) => {
    // Session 방식이면 session: true, JWT 방식이면 session: false
    // Session 방식이면 req.login() 사용
    passport.authenticate('local-signin', {session: false}, (err, user, info) => {
        if (err) {
            next(err);
        }
        if (!user) {
            res.json({
                isLoggedIn: false,
                username: '',
                message: info.message
            });
        } else {
            const token = jwt.sign({ username: user.username, type: user.type }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60,
            });
            res.cookie('jwt', token);
            res.json({
                isLoggedIn: true,
                username: user.username,
                message: info.message
            });
        }
    })(req, res, next);
});

// 로그아웃
// router.post('/', isLoggedIn, (req, res, next) => {
//
// });

module.exports = router;