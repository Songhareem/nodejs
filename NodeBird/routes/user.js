const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware').isLoggedIn;

// following 기능

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    
    try {
        // 로그인한 나 자신(req.user.id) 찾기
        const user = await user.findOne({ where: {id: req.user.id }});
        // 내가 팔로잉하는 사람(req.params.id) 추가
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;