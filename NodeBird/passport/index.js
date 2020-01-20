
// 로컬, 카카오 로그인 활성화

const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models').User;

const cashingSession = [];

module.exports = (passport) => {

    // user Ogj -> id 변환
    // req.login()시 한번 호출
    passport.serializeUser((user, done) => {
        // user 객체 전부를 세션에 저장하기는 무거우니 id만 저장
        done(null, user.id);
    });

    // id -> user Obj 변환
    // 매 get 요청마다 passport.sesseion()이 호출되며, 여기서 deserializeUser 호출
    // 모든 요청에 실행되므로 DB 조회를 캐싱해서 효율적이게 만들어야 함
    // 받은 id로 db조회하여 user 정보 복구
    passport.deserializeUser((id, done) => {
        
        console.log("============== deserializeUser ==============");
            
        if(cashingSession[id]) {
            console.log(cashingSession[id]);
            done(null, cashingSession[id]);
        } else {
            User.findOne({
                where: { id },
                include: [{
                  model: User,
                  attributes: ['id', 'nick'],
                  as: 'Followers',
                }, {
                  model: User,
                  attributes: ['id', 'nick'],
                  as: 'Followings',
                }],
            })
                .then( user => {
                    cashingSession[id] = user;
                    // done의 user = req.user, req.user 수정시 deserializeUser에서 해야함
                    done(null, user);   
                })
                .catch( err =>  {
                    console.log('deserializeError');
                    done(err);
                });
        }
    })

    local(passport);
    //kakao(passport);
}