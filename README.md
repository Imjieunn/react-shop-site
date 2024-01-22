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