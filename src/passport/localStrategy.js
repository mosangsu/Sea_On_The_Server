const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const {players} = require('mongoose/models');

const {Parent, Student} = require('sequelize/models');

module.exports = (passport) => {
    // 로그인
    // Async/Await으로 DB 결과값을 user에 담아 Parent와 Student를 동시에 처리
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            let user = null;
            if (req.body.type == '0') {
                user = await Parent.findOne({
                    attributes: ['username', 'password'],
                    where: {
                        username: username
                    }
                });
            } else if (req.body.type == '1') {
                user = await Student.findOne({
                    attributes: ['username', 'password'],
                    where: {
                        username: username
                    }
                });
            } else {
                done(null, false, {message: '올바른 접근이 아닙니다.'});
            }

            if (user) {
                const result = await bcrypt.compare(password, user.dataValues.password);
                if (result) {
                    user.dataValues.type = req.body.type;
                    done(null, user.dataValues, {message: '로그인되었습니다.'});
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (err) {
            console.error(err);
            done(err, false, {message: '로그인 오류가 발생했습니다.'});
        }
    }));

    // 회원가입
    // Parent와 Student의 로직이 분리되어 있기 때문에 Promise를 사용하여 별도로 처리
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, username, password, done) => {
        try {
            if (req.body.type == '0') {
                Parent.findOne({
                    attributes: ['username', 'password'],
                    where: {
                        username: username
                    }
                }).then(async (user) => {
                    const {realname} = req.body;
                    if (!user) {
                        const hash = await bcrypt.hash(password, 12);
                        Parent.create({
                            username: username,
                            password: hash,
                            realname: realname
                        }).then(user => {
                            done(null, req.body, {message: '가입되었습니다.'});
                        }).catch(err => {
                            console.error(err);
                            done(err, false, {message: '가입 오류가 발생했습니다.'});
                        });
                    } else {
                        done(null, false, {message: '중복된 아이디입니다.'});
                    }
                });
            } else if (req.body.type == '1') {
                Student.findOne({
                    attributes: ['username', 'password'],
                    where: {
                        username: username
                    }
                }).then((user) => {
                    const {realname, sex, birth, grade, parentUsername} = req.body;

                    // 기존 등록된 유저가 없으면
                    if (!user) {

                        // 부모 계정이 있는지 확인
                        Parent.findOne({
                            attributes: ['id'],
                            where: {
                                username: parentUsername
                            }
                        }).then(async (parentUser) => {

                            // 부모 계정이 있으면
                            if (parentUser) {
                                const hash = await bcrypt.hash(password, 12);
                                Student.create({
                                    username: username,
                                    password: hash,
                                    realname: realname,
                                    sex: sex,
                                    birth: birth,
                                    grade: grade,
                                    parentId: parentUser.id
                                }).then(user => {
                                    players.setPlayer(user.id, user.username, user.realname);
                                    done(null, req.body, {message: '가입되었습니다.'});
                                }).catch(err => {
                                    console.error(err);
                                    done(err, false, {message: '가입 오류가 발생했습니다.'});
                                });
                            } else {
                                done(null, false, {message: '존재하지 않는 부모 계정입니다.'});
                            }
                        });
                    } else {
                        done(null, false, {message: '중복된 아이디입니다.'});
                    }
                });
            } else {
                done(null, false, {message: '올바른 접근이 아닙니다.'});
            }
        } catch (err) {
            console.error(err);
            done(err, false, {message: '가입 오류가 발생했습니다.'});
        }
    }));

    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) token = req.cookies['jwt'];
        return token;
    };

    const opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
    };

    // JWT
    passport.use('local-jwt', new JWTStrategy(
        opts
        , (jwt_payload, done) => {
            try {
                if (jwt_payload.type == '0') {
                    Parent.findOne({
                        attributes: ['username', 'password'],
                        where: {
                            username: jwt_payload.username
                        }
                    }).then(user => {
                        if (user) {
                            user.dataValues.type = jwt_payload.type;
                            done(null, user.dataValues, {message: '유효한 토큰 입니다.'});
                        } else {
                            done(null, false, {message: '유효하지 않은 토큰 입니다.'});
                        }
                    });
                } else if (jwt_payload.type == '1') {
                    Student.findOne({
                        attributes: ['username', 'password'],
                        where: {
                            username: jwt_payload.username
                        }
                    }).then(user => {
                        if (user) {
                            user.dataValues.type = jwt_payload.type;
                            done(null, user.dataValues, {message: '유효한 토큰 입니다.'});
                        } else {
                            done(null, false, {message: '유효하지 않은 토큰 입니다.'});
                        }
                    });
                } else {
                    done(null, false, {message: '올바른 접근이 아닙니다.'});
                }
            } catch (err) {
                console.error(err);
                done(err, false, {message: 'JWT 오류가 발생했습니다.'});
            }
        }));
};