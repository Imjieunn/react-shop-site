import { memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseAge, changeName } from "../store/userSlice";
import { increaseCount, deleteCart } from "../store/cartSlice";

// 하위 컴포넌트의 재렌더링 조건 걸기 : memo (꼭 필요할 때만 재렌더링)
let Child = memo(function () {
    console.log('재렌더링됨')
    return <div>자식임</div>
})

function Cart() {

    // Redux store 가져와줌
    let store_state = useSelector((state) => { return state })
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    return (
        <div className="container">
            <Child></Child>
            <button onClick={() => { setCount(count + 1) }}>+</button>
            <h4>{store_state.user.name} {store_state.user.age}의 장바구니</h4>
            <button onClick={() => { dispatch(increaseAge(10)) }}>나이 추가하기</button>

            <Table striped bordered hover style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th width="5%">#</th>
                        <th width="55%">상품명</th>
                        <th width="20%">수량</th>
                        <th width="10%">수량추가</th>
                        <th width="10%">삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {(store_state.cart).map(function (value, index) {
                        return (
                            < tr key={index} >
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.count}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(increaseCount(store_state.cart[index].id))
                                    }}>+</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(deleteCart(index))
                                    }}>
                                        -
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table >
        </div>
    )
}

export default Cart;