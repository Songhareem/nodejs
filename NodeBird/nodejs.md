# 해당 프로젝트에 대해 

- nodejs 프로젝트를 진행하며 모르는 것을 미리 적용해보는 서브 프로젝트

# 인증

- ref : 
    - jwt 기본 설명 - https://velopert.com/2350
    - jwt 기본 구현 - https://stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/
    - jwt debugger - https://jwt.io
    - session 방식 
        - https://opentutorials.org/course/3400/21831
        - https://morningbird.tistory.com/33?category=641408
        - https://www.zerocho.com/category/NodeJS/post/579b3fc4062e76a002648af6
        - https://github.com/zerocho/nodejs-book

- passport를 활용
    - express-session을 이용 local
    - 카카오 개발자 rest API 이용 kakao
        - https://developers.kakao.com/
        - 1 ) 앱만들기
        - 2 ) 일반 탭에서 rest API 키 받아서 env 파일 및 kakaoStrategy(clientID)에 적용
        - 3 ) 플랫폼 추가 (웹 - 도메인 메인 주소)
        - 4 ) callbackURL 정하고, 그 주소를 Redirect URL로 설정
        - 5 ) 사용자관리에서 수집할 정보 지정
- jwt방식으로 차후에 확장으로 할 생각


# 보안

- ref :
    - 비밀번호 보안 - https://morningbird.tistory.com/32?category=641408
- md5/sha512/pbkdf2/bcrypt 중 bcrypt사용

- bcrypt : 비밀번호 암호화 패키지

# DB

- ref : 
    - sequelize 설명 및 구현 - https://jongmin92.github.io/2017/04/08/Node/sequelize/#8
    - sequelize crud 다루기 - https://hyunseob.github.io/2016/03/27/usage-of-sequelize-js/
- 사용 DB : MariaDB
- sequelize, sequelize-cli를 통해 구현
- sequelize db:create

# 이미지 업로드

- multer 이용 : 
    - 이미지를 업로드 하려면, html form에 enctype = "multipart/form-data" 추가
    - multipart/form-data를 해석하기 위해 multer필요
    - 세팅 후, multer 옵션
        - single : 이미지 하나(필드명)
        - array : 이미지 여러 개 (단일 필드)
        - fields : 이미지 여러 개(여러 필드)
        - none: 이미지 X
    - multerSet.option('imgId'); 으로 호출
        - imgId = form에서 img id 값
    - multer를 통해 프론트에서 오는 값은 req.file을 통해 옴

# 테스트

- postman 사용
- postman 사용 ref : https://www.a-mean-blog.com/ko/blog/Node-JS-API/_/API-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-Postman-%EC%84%A4%EC%B9%98%EB%B0%8F-%EA%B0%84%EB%8B%A8-%EC%82%AC%EC%9A%A9%EB%B2%95
- postman download : https://www.getpostman.com/downloads/

# AWS 관련

- es2
    - ref : https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html

- rds
    - ref : https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/Welcome.html
    - mysql -h <endpoint> -P 3306 -u <mymasteruser>  -p 명령어를 클라이언트에서 쳐서 접속

- 문제/해결
    - 문제 : [ERROR 2002] es2와 rds의 DB를 연동시키는 중, es2에 깔린 DB가 실행된건지 확인을 위해 es2의 mysql에 접근중 발생
        - 원인 : linux내에서 mysql 서버 데몬 미실행
        - 해결 : cli에서 service mysql start 실행
            - ref : https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_MySQL_%EC%8B%9C%EC%9E%91,_%EC%A0%95%EC%A7%80,_%EC%9E%AC%EC%8B%9C%EC%9E%91,_%EC%83%81%ED%83%9C%ED%99%95%EC%9D%B8
  
# dotenv 관련

- 문제 : process.env.key 가 undefined로 나오는 경우
    - 원인 : .env 파일을 찾지못하면 return undefined!
    - 해결 : require('dotenv').config({path: __dirname + '/.env'})

# 상태코드

- 회원가입 시, 이메일/아이디 가 중복될 때 사용할만한 응답 status code?
    - 400 Bad Request
        - RFC 7231 기준, 서버가 처리 못하는 부분이나 어떤 오류로 처리하지 못할 때 사용
    - 409 Conflict
        - 리소스의 현재 상태와 충돌해서 요청을 처리할 수 없으므로 클라이언트가 요청을 다시 클라이언트가 이 충돌을 수정해서 요청을 다시 보낼 경우
    - 403 Forbidden
        - RFC 7231 기준, 서버가 요청을 이해했으나 승인을 거부하는 경우, 요청에 인증 자격 증명이 제공된 상황일때 서버는 액세스 권한을 부여하기에 충분치 않은것으로 간주
    - 409를 사용 결정

- 자주 사용하는 status code
    - 200 - ok
        - request 성공
        - ex) resource 목록/resource 상세/resource 수정/그외 대부분의 API 성공
    - 201 - create
        - request 성공
        - ex) resource 생성 성공
    - 204 - no content
        - request 성공
        - ex) resource 삭제 성공
    - 301 - move permanently
        - 페이지 이동
    - 307 - temporary_redirect
        - 임시 페이지 이동
    - 400 - bad_request
        - request 실패
        - ex) 유효성 검사 통과 실패, 잘못된 요청
    - 401 - unauthorized
        - 인증 실패
        - ex) 세션 없음, 로그인 실패
    - 403 - forbidden
        - 인증은 성공했으나 권한이 없음
        - ex) 권한없는 자원에 접근하려함
    - 404 - not_found
        - API 없음
        - ex) route 조회 실패
    - 500 - internal_server_error
        - 오류
        - ex) 서버오류, exception