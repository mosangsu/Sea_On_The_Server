// .env 환경변수 사용
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const router = require('routes');

// http 요청 중, ingame 요청을 별도로 관리하기 위함
require('ingame');

// Express Start

const app = express();

// Module Start

passportConfig(passport);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cors')({
    origin: ['http://localhost:3001', 'http://localhost:5002'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // enable set cookie
}));
app.use(cookieParser(process.env.COOKIE_SECRET, {expires: 7, httpOnly: true, signed: true, secure: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
// 세션 기반 인증을 사용할 경우 passport.session()이 필수
//app.use(passport.session());
app.set('jwt-secret', process.env.JWT_SECRET);

// Router

app.use('/', router.main);
app.use('/session', router.session);
app.use('/user', router.user);
app.use('/cmd', router.cmd);

// Not Found
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

module.exports = app;
