
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',     // req.body.email
        passwordField: 'password',  // req.body.password
    },
    async (email, password, done) => {  // done(에러, 성공, 실패)
        try {
            const user = await User.findOne({where: {email}})
            // 유저 검사
            if(user) {
                // 비밀번호 검사
                const result = await bcrypt.compare(password, user.password);
                if(result) {
                    // 비번 일치
                    done(null, user);
                } else {
                    // 비번 불일치
                    done(null, false, {message: `이메일 또는 비밀번호가 맞지 않습니다`}); 
                }
            } else {
                // 접속 실패
                done(null, false, {message: '이메일 또는 비밀번호가 맞지 않습니다'});
            }
        } catch(err) {
            console.error(err);
            // 서버 에러
            done(err);
        }
    }));
};