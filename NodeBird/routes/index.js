
const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware').isLoggedIn;
const isNotLoggedIn = require('./middleware').isNotLoggedIn;
const Post = require('../models').Post;
const User = require('../models').User;

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
    Post.findAll({
        // include : join할 대상을 배열 또는 그냥 넘겨줌
        include: {
            model: User,
            attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
    }).then((posts) => {
        res.render('index.pug', {
            title: 'NodeBird',
            twits: posts,
            user: req.user,
            loginError: req.flash('loginError'),
        });
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});

module.exports = router;