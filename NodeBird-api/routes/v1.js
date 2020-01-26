const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middleware');
const { Domain, User, Post, Hashtag } = require('../models');

// api 서버의 응답형식은 하나로 통일해주는게 좋음 (json등)
// 에러 코드를 고유하게 지정해 에러가 뭔지 쉽게 알 수 있게 할 것 

router.post('/token', async(req, res) => {
    const { clientSecret } = req.body;
    try {
        // clientSecret 이용해서 Domain 검사
        const domain = await Domain.findOne({
            where: { clientSecret },
            include : {
                model: User,
                attribute: ['nick', 'id'],
            },
        });
        // Domain이 아니라면,
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요'
            });
        }
        // jwt 토큰 발금
        const token = jwt.sign({
            id: domain.user.id,
            nick: domain.user.nick,
        }, process.env.JWT_SECRET, {
            // options
            expireIn: '1m',      // 유효시간, s,m,h 단위(초,분,시)가 있음
            issuer: 'nodebird',
            
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token,
        });
    } catch(error) {
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
})

module.exports = router;