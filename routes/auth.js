
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models').User;
const passport = require('passport');
const isLoggedIn = require('./middleware').isLoggedIn;
const isNotLoggedIn = require('./middleware').isNotLoggedIn;

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const user = await User.findOne({where: { email }});
        if(user) {
            req.flash('joinError', '이미 가입된 이메일 입니다');
            return res.redirect('/join');
        }
        console.time('암호화 시간 시작');
        // 뒤의 숫자가 커질수록 암호화 시간 길어지고 강력해짐, 약 1초 동안 되면 ㄱㅊ
        const hash = await bcrypt.hash(password, 12);
        console.timeEnd('암호화 시간 끝')
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    // done의 인자(에러, 성공, 실패)가 authError, user, info 에 대응
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            req.flash('login Error', info.message);
            return res.redirect('/');
        }
        // 사용자 정보 받아서 로그인 -> 세선에 저장, req.user에서 사용자 정보 찾을 수 있음
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();  // 다른 세션 다 지워져서 문제인듯?
    res.redirect('/');
})

module.exports = router;