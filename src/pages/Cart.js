import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

function Cart() {

    // Redux store 가져와줌
    let store_state = useSelector((state) => { return state })
    let dispatch = useDispatch()

    return (
        <>
            {store_state.user}의 장바구니

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="10%">#</th>
                        <th width="70%">상품명</th>
                        <th width="20%">수량</th>
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
                                        dispatch(changeName())
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table >
        </>
    )
}

export default Cart;