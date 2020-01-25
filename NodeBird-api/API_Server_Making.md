
# API (Application Programming Interface)

- 남이 만든 코드를 사용할 수 있게 해주는 창구

# API 서버의 개념과 필요성

- API 설명 예시 ref : http://www.mobileflow.co.kr/main/blog/220824582088

- API 서버?
    - 보통 앱 또는 웹 서비스 개발에서 다른 서비스에 소스는 공개하지 않으면서 권한에 따라 기능(데이터)을 제공하는 서버

- 장점
    - 남에게 보여주고 싶은 API와 숨기고 싶은 API 구분 가능(권한별 등)

# uuid

- 고유한 값을 만들어주는 패키지

# JWT(JSON_WEB_TOKEN)

- 토큰을 만들어주는 package

- 노출되면 안되는 JWT_SECRET KEY가 필요(.env에 배치)

- 프론트나 서버에서 인증 용도로 사용 가능

- JWT 토큰 내용은 볼 수 있음 ( 민감한 내용은 저장하면 X )

- 변조가 불가능하므로 믿고 사용할 수 있음