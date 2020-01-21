
# API (Application Programming Interface)

- 남이 만든 코드를 사용할 수 있게 해주는 창구

# API 서버의 개념과 필요성

- API 설명 예시 ref : http://www.mobileflow.co.kr/main/blog/220824582088

- API 서버?
    - 보통 앱 또는 웹 서비스 개발에서 다른 서비스에 소스는 공개하지 않으면서 권한에 따라 기능(데이터)을 제공하는 서버

- 장점
    - 남에게 보여주고 싶은 API와 숨기고 싶은 API 구분 가능(권한별 등)
    - main 서버에서 메인 로직에 크게 영향을 끼치지않는 것들을 분리한 것이므로 죽어도 main 서버는 살아있음

- 단점
    - 너무 많이 api서버를 분리하면, log추적 힘듦 등의 불편함 발생