# react-shop-site
### 🛒 react로 쇼핑몰 사이트 만들기
#### 목표 : react로 쇼핑몰 사이트를 만들어보며, react의 기본 기능 숙지하기
1. react-bootstrap 사용해서 기본 레이아웃 구성
2. 레이아웃 - 반복구조 컴포넌트화, map 이용하여 코드 단순화
3. 페이지이동 : react-router-dom 라이브러리 이용
- BrowserRouter, Routes, Route
- Link, useNavigate
- nested-routes (2중 라우트), Outlet
- useLocation : 현재 주소 나타내는 함수
- :url 파라미터 & useParams() : 무한의 상세페이지 생성
4. styled-components 적용
5. useEffect 적용 : React의 LifeCycle 이해, useEffect 안에 있는 코드는 html 렌더링 후에 동작한다!
- useEffect( ( ) => { }, [ ]) <- useEffect 실행조건
- useEffect내에 return 작성 가능 (useEffect 동작 전에 실행되도록)
6. ajax 이용해서 서버와 통신
- axios 이용 (GET/POST)
7. 컴포넌트 애니메이션 적용
- css 설정
- 특정 시점(useEffect 이용!!)에 나타나도록 설정
8. state 전역상태관리 (Context API, Redux)
- Redux 초기세팅(Redux 공식문서 참고)
- store.js : state 보관
- store에 저장되어 있는 state들 다른 파일 컴포넌트에서 꺼내쓰기
- redux의 state 변경
- redux 파일 분할
9. localStorage로 data 저장하기
- 새로고침 시 state 데이터 리셋 현상 해결하기
10. react-query
- 실시간 데이터를 계속 가져오고 싶을 때 이용
- 장점1. ajax 요청 성공/실패/로딩중 상태를 쉽게 파악할 수 있다.
- 장점2. 틈만나면 알아서 ajax 재요청해준다.
- 장점3. 실패시 재시도 알아서 해줌
- 장점4. ajax로 가져온 결과는 state 공유 필요없음