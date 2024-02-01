import { createSlice } from "@reduxjs/toolkit"

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseCount(state, i) {
            // state에서 id값을 받아와서 해당 id의 상품 index를 반환 => 반환한 index를 이용해서 count 늘리기
            let 상품id = state.findIndex((a) => { return a.id == i.payload })
            state[상품id].count += 1
        },
        addCart(state, item) {
            // 기존 state에 새로운 array(item) 추가
            if (state.some((a) => { return a.name == item.payload.name })) {
                let 상품id = state.findIndex((b) => { return b.id == item.payload.id })
                state[상품id].count += item.payload.count
            } else {
                state.push(item.payload)
            }
        },
        deleteCart(state, idx) {
            state.splice(idx.payload, 1)
        }
    }
})
export let { increaseCount, addCart, deleteCart } = cart.actions

export default cart