// eslint-disable-next-line

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 상품데이터 from './data'
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import Detail from './pages/Detail';
import axios from 'axios';
import styled from 'styled-components';

let ButtonArea = styled.div`
  display: flex;
  flex-direction : column;
  width : auto;
`

function App() {

  let [shoes, setShoes] = useState(상품데이터)
  const { pathname } = useLocation()

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark"
        className={pathname === "/" ? null : 'paddingNavbar'}>
        <Container>
          <Navbar.Brand href="/">ReactMall</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='menu'>Home</Link>
            <Link to="/detail" className='menu'>Detail</Link>
          </Nav>
          <OffCanvasExample placement={'end'} name={'세부메뉴'} />
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} setShoes={setShoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지입니다</div>} />
      </Routes>

    </div>
  );
}

export default App;

function MainPage(props) {

  return (
    <>
      <div className='main-bg'></div>
      <Row style={{ display: 'inline-flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {
          props.shoes.map(function (shoe, index) {
            return (
              <ShoeLists key={shoe.id} idx={index} shoesInfo={shoe} />
            )
          })
        }
      </Row>

      < ButtonArea >
        <button
          onClick={() => {
            let newShoes = [...props.shoes]
            newShoes.sort((a, b) => a.title.localeCompare(b.title))
            props.setShoes(newShoes)
          }}>가나다순 정렬
        </button>
        <button onClick={() => {
          axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((결과) => {
              let copy = [...props.shoes, ...결과.data]
              props.setShoes(copy)
            })
            .catch(() => { console.log('실패함 ㅅㄱ') })
        }}>더보기</button>
      </ButtonArea>

    </>
  )
}

function Event() {
  return (
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </>
  )
}

function ShoeLists(props) {
  let navigate = useNavigate()
  return (
    <Col sm onClick={() => { navigate('/detail/' + props.idx) }} style={{ cursor: "pointer" }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoesInfo.id + 1) + '.jpg'} width='80%' />
      <h4>{props.shoesInfo.title}</h4>
      <p>{props.shoesInfo.content}</p>
      <p>{props.shoesInfo.price}</p>
    </Col>
  )
}

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{
        background: '#CCCCCC',
        color: 'black',
        border: 'none'
      }}
        variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <li>상의</li>
          <li>하의</li>
          <li>주얼리</li>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}