// eslint-disable-next-line

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 상품데이터 from './data'
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';
import styled from 'styled-components';

let ButtonArea = styled.div`
  display: flex;
  flex-direction : column;
  justify-content : center;
  align-content : center;
  width : auto;
`

function App() {

  let [shoes, setShoes] = useState(상품데이터)
  const { pathname } = useLocation()

  useEffect(() => {
    localStorage.setItem('viewID', JSON.stringify([]))
  }, [])

  return (
    <div className="App" style={{ position: 'relative' }}>

      <Navbar bg="dark" data-bs-theme="dark"
        className={pathname === "/" ? null : 'paddingNavbar'}>
        <Container>
          <Navbar.Brand href="/">ReactMall</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='menu'>Home</Link>
            <Link to="/detail" className='menu'>Detail</Link>
            <Link to="/cart" className='menu'>Cart</Link>
          </Nav>
          <OffCanvasExample placement={'end'} name={'세부메뉴'} />
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} setShoes={setShoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
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
  let page = 1
  let [currentPage, setCurrentPage] = useState(1)
  let [activeBtn, setActiveBtn] = useState(false)

  const fetchShoeList = () => {
    axios.get('https://codingapple1.github.io/shop/data' + (currentPage + 1) + '.json')
      .then((결과) => {
        let copy = [...props.shoes, ...결과.data]
        props.setShoes(copy)
      })
      .catch(() => { console.log('실패함 ㅅㄱ') })
  }

  const handleShoeList = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage > page) {
      setActiveBtn(true)
    }
    if (activeBtn) {
      alert('더이상 상품이 존재하지 않습니다!')
    } else {
      fetchShoeList()
    }
  }

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
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={handleShoeList}>더보기</button>
          <button onClick={handleShoeList}>접기</button>
        </div>

        <div>
          <button style={{ width: 'fit-content' }}
            onClick={() => {
              let newShoes = [...props.shoes]
              newShoes.sort((a, b) => a.title.localeCompare(b.title))
              props.setShoes(newShoes)
            }}>가나다순 정렬
          </button>
        </div>
      </ButtonArea>

      <최근본상품 />
      <div style={{ height: '1000px' }}></div>

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

  const saveShoeID = () => {
    navigate('/detail/' + props.idx)

    let view = JSON.parse(localStorage.getItem('viewID'))
    let viewArray = Object.values(view)
    viewArray.push(props.idx)
    let viewSet = new Set(viewArray)
    viewArray = Array.from(viewSet)
    localStorage.setItem('viewID', JSON.stringify(viewArray))
  }

  return (
    <Col sm={4} onClick={saveShoeID} style={{ cursor: "pointer" }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoesInfo.id + 1) + '.jpg'} width='80%' />
      <h4>{props.shoesInfo.title}</h4>
      <p>{props.shoesInfo.content}</p>
      <p>{props.shoesInfo.price}</p>
    </Col>
  )
}

let Watched = styled.div`
  border : 1px solid black;
  width : 200px;
  height : 500px;
  position : absolute;
  top : 80px;
`

let Title = styled.div`
  height : 8%;
  font-weight : bold;
  border : 1px solid black;
  background-color : gray;
  display : flex;
  justify-content : center;
  align-items : center;
`

let 상품갯수 = styled.div`
  width : 20px;
  height : 20px;
  border-radius : 50%;
  margin : 0 8px;
  background-color : white;
  display : flex;
  justify-content : center;
  align-items : center;
`

let WatchedList = styled.div`
  height : 85%;
  border : 1px solid black;
  padding : 10px 0;
  font-weight : bold;
  display : flex;
  flex-direction : column;
  align-items : center;
`

let Item = styled.div`
  border : 1px solid black;
  width : 80%;
  height : 35%;
  margin: 5px 0;
  padding : 20px;
`

let TopBtn = styled.button`
  width : 100%;
  height : 7%;
  background-color : ligth-gray;
`

function 최근본상품() {
  return (
    <Watched>
      <Title>
        CART
        <상품갯수>0</상품갯수>
      </Title>
      <WatchedList>
        최근 본 상품
        <Item />
        <Item />
        <Item />
      </WatchedList>
      <TopBtn>TOP</TopBtn>
    </Watched>
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