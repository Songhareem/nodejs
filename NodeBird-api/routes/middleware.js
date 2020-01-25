
// passport 제공 res 함수 : login logout isAuthenticated

const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    // 로그인 여부 확인
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

// jwt 검증
exports.verifyToken = (req, res, next) => {

    try {
        // jwt.verify(토큰, JWT_SECRET)
        // 1) 클라에서는 토큰을 authorization HTTP의 헤더에 넣어서 서버로 보냄
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // 검증 성공시 next, 검증실패시 error
        return next();
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다' // 유효기간이 만료
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다' //  내가 만든 토큰이 아님
        })
    }
};