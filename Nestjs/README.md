
# install 

- for use nest
    - $ npm i -g @nestjs/cli
    - $ nest new project-name
    - use npm / yarn => npm

- for validation / transform
    - $ npm i class-validator class-transformer

- for PartialType (원본이 되는 class의 인자들을 필수값이 아닌것으로 가져옴)
    - $ npm i @nestjs/mapped-types

# ExpressJS / FastifyJS

- nodejs 진영 백엔드 프레임워크

- FastifyJS가 ExpressJS보다 2배정도 빠르다

- NestJS는 두 프레임워크 위에서 돌아감
    - 그러므로 @Req()/@Res() 사용은 권장되지 않음

# test?

- 주의점
    - 실제 서버와 test 서버가 돌아가는 것이 다르므로 환경을 꼭 맞춰줘야 함


- jest!
    - 자바스크립트 테스트 라이브러리

- ~.spec.ts
    - jest가 찾아서 읽을 수 있는 테스트 파일 

- "test": "jest",
- "test:watch": "jest --watchAll"
    - 유닛 테스팃 (function 단일 테스트)
    - "jest --watch" => "jest --watchAll" 로 변경해서 사용할것
- "test:cov": "jest --coverage"
    - 코드가 얼마나 테스팅 됐는지 혹은 안됐는지 알려줌
- "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
- "test:e2e": "jest --config ./test/jest-e2e.json"
    - 모든 시스템 테스팅 (사용자 입장 테스트)

- it.todo('~')
    - 아직 작업되지 않았지만 작업해야할 test에 대한 todo list

# 의존성주입

- module의 providers에 넣어지는 것을 NestJS가 처리해서 제공
