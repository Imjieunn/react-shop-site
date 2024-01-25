import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

let YellowBtn = styled.button`
    background: ${props => props.bg};
    color: ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px;
`
// 기존 스타일 복사기능 (기존꺼 그대로 가져와서 여기에 뭘 더 추가)
// let NewBtn = styled.button(YellowBtn)`
//     margin : 20px;
// `

let Box = styled.div`
    background: grey;
    padding: 20px;
`
let Order = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

function Detail(props) {

    let [count, setCount] = useState(0)
    let [수량, 변한수량] = useState("")
    let [isnumber, setIsnumber] = useState(false)
    let { id } = useParams();
    let len = (props.shoes).length
    let num = (props.shoes).filter((value) => value.title == props.shoes[id].title)[0].id
    let [timer, setTimer] = useState(false)

    useEffect(() => {
        let a = setTimeout(() => { setTimer(true) }, 2000)
        console.log(2)
        return () => {
            console.log(1)
            clearTimeout(a)
        }
    })

    useEffect(() => {
        console.log("유효성검사 시작!")
        if (isNaN(수량) == true) {
            setIsnumber(true)
        } else {
            setIsnumber(false)
        }
    }, [수량])

    // const 숫자인지판별 = (e) => {
    //     수량 = e.target.value
    //     if (isNaN(수량) === true) {
    //         setIsnumber(true)
    //     } else {
    //         setIsnumber(false)
    //     }
    // }

    return (
        <div className="container">
            {/* <YellowBtn bg="orange">버튼</YellowBtn>
            <YellowBtn bg="blue">버튼</YellowBtn> */}

            {
                timer ? null :
                    <div className='alert alert-warning'>
                        2초이내 구매시 할인
                    </div>
            }


            {count}
            <button onClick={() => {
                setCount(count + 1)
            }}>버튼</button>

            {
                id <= len ?
                    <신발구매정보 shoes={props.shoes} num={num} id={id} 변한수량={변한수량} isnumber={isnumber} />
                    : <div>해당 페이지는 존재하지 않습니다.</div>
            }

            <탭 />
        </div>
    )
}

export default Detail

let 탭버튼 = styled.button`
    border : none;
    background : ${props => props.bgcolor};
    padding : 10px;
    border-radius : 10px;
`

function 탭() {
    let 버튼명 = [{
        name: '버튼1',
        color: 'yellow'
    }, {
        name: '버튼2',
        color: 'green'
    }, {
        name: '버튼3',
        color: 'pink'
    }]

    let [탭노출여부, set탭노출여부] = useState(0)

    // const 탭버튼클릭 = (index) => {
    //     let updated탭노출여부 = 탭노출여부.map((_, i) => i === index);
    //     set탭노출여부(updated탭노출여부)
    // }

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {버튼명.map(function (버튼, index) {
                    return (
                        <탭버튼 bgcolor={버튼.color} key={index} onClick={() => { set탭노출여부(index) }}>
                            {버튼.name}
                        </탭버튼>
                    )
                })}
            </ div>

            <탭상세정보 탭노출여부={탭노출여부} />

        </div>
    )
}

// props 대신 쓰는 방법
function 탭상세정보({ 탭노출여부 }) {
    return (
        [<div style={{ border: '1px solid black', margin: '20px', height: '300px' }}>버튼1 탭입니다.</div>,
        <div style={{ border: '1px solid black', margin: '20px', height: '300px' }}>버튼2 탭입니다.</div>,
        <div style={{ border: '1px solid black', margin: '20px', height: '300px' }}>버튼3 탭입니다.</div>][탭노출여부]
    )
}

function 신발구매정보(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes' + (props.num + 1) + '.jpg'} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{props.shoes[props.id].title}</h4>
                <p>{props.shoes[props.id].content}</p>
                <p>{props.shoes[props.id].price}</p>
                <Order>
                    <p>구매수량
                        <input
                            style={{ marginLeft: '10px' }}
                            onChange={(e) => props.변한수량(e.target.value)}
                        />
                    </p>
                    {/* onChange={숫자인지판별} */}
                    {props.isnumber ? <숫자유효성검사 /> : null}
                </Order>

                <button className="btn btn-danger">주문하기</button>
            </div>
        </div>
    )
}

function 숫자유효성검사() {
    return (
        <div style={{
            background: 'red', color: 'white', margin: 'auto', marginBottom: '10px'
        }}>경고 : 숫자만 입력하세요
        </div>
    )
}
