
# Cookie/Session 및 jwt 이론 그리고 흐름도 

- ref : https://tansfil.tistory.com/58?category=255594

# jwt의 AccessToken과 같이 사용하는 RefreshToken 그리고 Sliding Sessions

- ref : https://blog.ull.im/engineering/2019/02/07/jwt-strategy.html

# passport jwt 를 이용한 인증 및 로그인아웃 구현

- ref : https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

- Access Token
    - 짧은 유효시간(약 30분 내외), 서버 단에서 통제 불가능
    - 쿠키로써 클라 localStorage에 저장
    - 로그아웃시, refresh Token과 함께 클라에서 삭제

- Refresh Token
    - 긴 유효시간(2주에서 한달 사이), 서버 단에서 통제 가능(시간 지났을 시, 로그아웃 시 삭제 등)
    - 클라이언트에서 가능한한 안전한 스토리지에 저장(탈취되면 안되므로)
        - 웹에서는 localStorage에 저장하되, Access Token만료시에만, Refresh Token을 Header에 포함하여 보냄 (가능하면 노출이 되지 않도록)
    - Redis나 memcached 등을 이용하지 않고 DB에 저장
        - Redis 및 memcached 을 이용할거면 Session 방식을 사용하는 것이 나을듯
        - DB에 저장하는 이유는 stateless 서버로 만들기 위함

- 클라는 AccessToken만료 오류를 받으면 따로 저장했던 RefreshToken을 이용하여, AccessToken 재발급을 요청

- 서버는 유효한 RefreshToken으로 요청이 들어오면 새 AccessToken 발급, 만료된 RefreshToken으로 요청이 올 경우, 오류를 반환하고 재로그인 요구

# OAuth, OAuth2란? 차이점?

- ref : https://minwan1.github.io/2018/02/24/2018-02-24-OAuth/

# 카카오 관련 엑세스 토큰/리프레시 토큰 발급에 대해

- ref : https://devtalk.kakao.com/t/topic/23242/4