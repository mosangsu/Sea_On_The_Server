const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('middleware/loginCheck');

// 회원 정보 요청
router.get('/', isLoggedIn, (req, res, next) => {
    if (req.cookies.jwt) {
        passport.authenticate('local-jwt', { session: false }, (err, user, info) => {
            if (err) {
                next(err);
            }

            if (user) {
                res.json({
                    isLoggedIn: true,
                    username: user.username,
                    message: info.message
                });
            } else {
                res.json({
                    isLoggedIn: false,
                    username: '',
                    message: info.message
                });
            }
        })(req, res, next);
    } else {
        res.json({
            isLoggedIn: false,
            username: '',
            message: '로그인 후 이용해주시기 바랍니다.'
        });
    }
});

// 회원 가입
router.post('/', (req, res, next) => {
    // Session 방식이면 session: true, JWT 방식이면 session: false
    // Session 방식이면 req.login() 사용
    passport.authenticate('local-signup', {session: false}, (err, user, info) => {
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

// 회원 정보 수정
router.put('/', isLoggedIn, (req, res, next) => {

});

// 회원 정보 삭제
router.delete('/', isLoggedIn, (req, res, next) => {

});

module.exports = router;