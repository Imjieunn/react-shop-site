import React from 'react'
import { useParams } from 'react-router-dom'

function Detail(props) {

    let { id } = useParams();
    let len = (props.shoes).length

    return (
        <div className="container">
            {
                id <= len ?
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                        </div>
                        <div className="col-md-6">
                            <h4 className="pt-5">{props.shoes[id].title}</h4>
                            <p>{props.shoes[id].content}</p>
                            <p>{props.shoes[id].price}</p>
                            <button className="btn btn-danger">주문하기</button>
                        </div>
                    </div>
                    :
                    <div>해당 페이지는 존재하지 않습니다.</div>

            }

        </div>
    )
}

export default Detail
