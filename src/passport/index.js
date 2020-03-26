const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

module.exports = (passport) => {

    // 세션 기반 인증을 사용할 경우 serializeUser()와 deserializeUser()가 필수
    // passport.serializeUser((user, done) => {
    //   done(null, user);
    // });
    //
    // passport.deserializeUser((user, done) => {
    //   done(null, user);
    // });

    local(passport);
    // 다른 Strategy 만들게되면 여기에 추가
    // kakao(passport);
};
