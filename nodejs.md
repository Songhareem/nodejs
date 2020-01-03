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

# 테스트

- postman 사용
- postman 사용 ref : https://www.a-mean-blog.com/ko/blog/Node-JS-API/_/API-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-Postman-%EC%84%A4%EC%B9%98%EB%B0%8F-%EA%B0%84%EB%8B%A8-%EC%82%AC%EC%9A%A9%EB%B2%95
- postman download : https://www.getpostman.com/downloads/
