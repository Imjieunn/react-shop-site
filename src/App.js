import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 상품데이터 from './data'

function App() {

  let [shoes] = useState(상품데이터)
  // let [shoesImg] = useState([
  //   "https://codingapple1.github.io/shop/shoes1.jpg",
  //   "https://codingapple1.github.io/shop/shoes2.jpg",
  //   "https://codingapple1.github.io/shop/shoes3.jpg",
  // ])

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ReactMall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
          <OffCanvasExample placement={'end'} name={'세부메뉴'} />
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <Row>
        {
          shoes.map(function (key, index) {
            return (
              <ShoeLists idx={index} shoesInfo={key} />
            )
          })
        }
      </Row>
    </div>
  );
}

export default App;

function ShoeLists(props) {
  return (
    <Col sm>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg'} width='80%' />
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