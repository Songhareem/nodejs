
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models').User;

// 1. /auth/kakao 로 요청
// 2. 카카오 로그인
// 3. /auth/kakao/callback으로 프로필 반환

module.exports = (passport) => {
    // kakao flow 2
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,    // 카카오 앱 아이디
        callbackURL:'/auth/kakao/callback', // 카카오 리다이렉트 주소
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // kakao flow 4
        try{
            const user = await User.findOne({
                where: {
                    snsId: profile.id,
                    provider: 'kakao',
                },
            });
            if(user) {
                // DB에 kakao로 등록한 유저가 있다면 유저 반환
                done(null, user);
            } else {
                // DB에 kakao로 등록한 유저가 없다면 유저 등록 후 반환
                const newUser = await User.create({
                    //console.log(profile)  // profile 객체 내에 뭐가 있는지 확인가능
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',  // provider? 여러 snsId가 어디것인지 구분하기 위해
                });
                done(null, newUser);
            }
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
};