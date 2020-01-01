
const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware').isLoggedIn;
const isNotLoggedIn = require('./middleware').isNotLoggedIn;

// 프로필 페이지
router.get('/profile', isLoggedIn, (req, res) => {

    res.render('profile.pug', {title: `내 정보 - NodeBird`, user: null});
});

// 회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {

    res.render('join.pug', {
        title: '회원가입 - NodeBird',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

// 메인 페이지
router.get('/', (req, res, next) => {
    
    console.log('connect here');
    res.render('index.pug', {
        title: 'NodeBird',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

module.exports = router;