
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// upload setting
const upload = multer({
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

router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.body, req.file);
    // 프론트로 이미지가 어디로 저장됐는지 보내줌
    res.json({ url: `/img/${req.file.filename}`});
});

router.post('/');

module.exports = router;