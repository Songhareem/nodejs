
// passport 제공 res 함수 : login logout isAuthenticated

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