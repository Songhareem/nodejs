
# GraphQL의 시작

- graphql-yoga
    - graphQL기반 프로젝트 setup 툴
    - npm i graphql-yoga

- graphQL로 해결가능한 문제
    - over-fetching
        - 요청한 정보보다 많은 정보를 DB에서 받아오는것
        - (userName만 필요한데, userAddress, uesrGender등까지 DB 다 긁어오는 경우 등)
    - under-fetching
        - 필요한 데이터를 여러번에 걸쳐 요청할 수 밖에 없는것 

- graphQL의 핵심 개념
    - Query : 단순히 DB 등으로부터 데이터를 받음
    - Mutation : DB 등의 데이터를 변경(수정/삭제)