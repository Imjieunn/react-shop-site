import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {

    // Redux store 가져와줌
    let store_state = useSelector((state) => { return state })

    return (
        <>
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
                            </tr>
                        )
                    })}
                    {/* 
                    <tr>
                        <td>{store_state.id[1]}</td>
                        <td>{store_state.상품명[1]}</td>
                        <td>{store_state.담은갯수[1]}</td>
                    </tr> */}
                </tbody>
            </Table >
        </>
    )
}

export default Cart;