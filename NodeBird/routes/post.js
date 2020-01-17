
const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models').Post;
const Hashtag = require('../models').Hashtag;
const User = require('../models').User;
const router = express.Router();
const isLoggedIn = require('./middleware').isLoggedIn;

// upload setting
const uploadImg = multer({
    // 내부 저장소, 외부 저장소(s3, 클라우드 등) 지정
    storage: multer.diskStorage({
        // file 경로 지정
        destination(req,file,cb) {
            // cb(에러, 결과값)
            cb(null,'uploads/');
        },
        // file 명 지정
        filename(req,file,db) {
            // 확장자 가져오기
            const ext = path.extname(file.originalname);
            // 파일원본명 + 날짜(파일명 중복을 막기위해) + 확장자
            cb(null,path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limit: {
        // 5 메가 제한
        filesize: 5 * 1024 * 1024
    } 
});

router.post('/img', isLoggedIn, uploadImg.single('img'), (req, res) => {
    console.log(req.body, req.file);
    // 프론트로 이미지가 어디로 저장됐는지 보내줌
    res.json({ url: `/img/${req.file.filename}`});
});

const uploadPost = multer();
router.post('/', isLoggedIn, uploadPost.none(), async (req, res,next) => {
    // 게시글 업로드
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,    // 일대다 관계에 따라 생긴 컬럼
        });
        // 정규표현식, #뒤를 배열로 가져옴
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            // 안녕하세요 #노드 #익스프레스 => hashtags = ['#노드', '#익스프레스']
            // promise.all 과 map을 써서 전부 넣음
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                // slice(1): #표시 제거, toLowerCase(): 전부 소문자로 교체
                where: {title: tag.slice(1).toLowerCase()},
            })));
            // post와 hashtag를 연결
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/hashtag', async (req, res, next) => {

    const query = req.query.hashtags;
    if(!query) {
        return res.redirect('/');
    }
    // A.getB : 관계있는 로우 조회
    // A.addB : 관계 형성
    // A.setB : 관계 수정
    // A.removeB : 관계 제거
    try {
        const hashtag = await Hashtag.findOne({ where : {title: query}});
        let posts = [];
        if(hashtag) {
            post = await hashtag.getPosts({include: [{model: User}]});
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: this.posts,
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;