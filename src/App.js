// eslint-disable-next-line

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import 상품데이터 from './data'
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from 'react-query'

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

  // 새로고침 시에 계속해서 viewID가 []로 리셋되는 것을 막기 위해
  // 이미 localStorage에 watched 향목이 있으면 [] 이거 새로 넣지 말라고 코드 짜기
  useEffect(() => {
    if (!(localStorage.getItem('viewID'))) {
      localStorage.setItem('viewID', JSON.stringify([]))
    }
  }, [])

  let result = useQuery(['작명'], () =>
    axios.get('https://codingapple1.github.io/userdata.json')
      .then((a) => {
        // 리액트 쿼리 장점2 : 틈만나면 자동으로 재요청해줌(refetch)
        // 리액트 쿼리 잠점3 : ajax 실패 시 3-4번 자동 재시도함(retry)
        console.log('요청됨')
        return a.data
      })
  )


  return (
    <div className="App">

      {/* 리액트 쿼리 장점 1 : ajax 요청 성공/실패/로딩중 상태를 쉽게 파악할 수 있다 */}
      <div>{result.isLoading && '로딩중'}</div>
      <div>{result.isError && '에러남'}</div>
      <div>{result.data && result.data.name}</div>

      <Navbar bg="dark" data-bs-theme="dark"
        className={pathname === "/" ? null : 'paddingNavbar'}>
        <Container>
          <Navbar.Brand href="/">ReactMall</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='menu'>Home</Link>
            <Link to="/detail" className='menu'>Detail</Link>
            <Link to="/cart" className='menu'>Cart</Link>
          </Nav>
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
    <div>
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

      <최근본상품 shoes={props.shoes} />
      <div style={{ height: '1000px' }}></div>

    </div>
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
  width : 200px;
  height : 500px;
  top : 100px;
  position : fixed;
  opacity : 0.5;
  &:hover {
    opacity : 1;
    transition: 0.5s;
  }
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
  min-height : 430px;
  max-height : 430px;
  overflow-y: auto;
  border : 1px solid black;
  background : white;
  padding : 10px 0;
  font-weight : bold;
  display : flex;
  flex-direction : column;
  align-items : center;
  &::-webkit-scrollbar {
    display: none;
  }
`

let Item = styled.div`
  background-image : ${({ backgroundImgUrl }) => `url('https://codingapple1.github.io/shop/shoes${backgroundImgUrl}.jpg')`
  };
  background-size: cover; /* 이미지를 div에 맞춰서 resize */
  background-position: center; /* 이미지를 가운데 정렬 */
  width : 80%;
  min-height : 150px;
  margin: 5px 0;
  padding : 20px;
`

let TopBtn = styled.button`
  width : 100%;
  height : 7%;
  background-color : ligth-gray;
`

function 최근본상품(props) {
  let [watchedID, setWatchedID] = useState([])
  let [watchedItem, setWatchedItem] = useState([])

  useEffect(() => {
    setWatchedID(JSON.parse(localStorage.getItem('viewID')))
  }, [])

  useEffect(() => {
    for (let i = 0; i < (props.shoes).length; i++) {
      if (watchedID.includes((props.shoes[i]).id)) {
        setWatchedItem(prevWatchedItem => [...prevWatchedItem, props.shoes[i]]);
      }
    }
  }, [watchedID])

  return (
    <Watched>
      <Title>
        CART
        <상품갯수>{watchedItem.length}</상품갯수>
      </Title>
      <WatchedList>
        최근 본 상품
        {
          watchedItem.map((item, idx) =>
            < Item key={idx} backgroundImgUrl={(item.id) + 1} />
          )
        }
      </WatchedList>
      <TopBtn>TOP</TopBtn>
    </Watched>
  )
}